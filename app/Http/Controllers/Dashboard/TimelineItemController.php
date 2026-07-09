<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\TimelineItemReorderRequest;
use App\Http\Requests\Dashboard\TimelineItemStoreRequest;
use App\Http\Requests\Dashboard\TimelineItemUpdateRequest;
use App\Models\TimelineItem;
use App\Services\UploadedImageProcessor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TimelineItemController extends Controller
{
    /**
     * List the timeline items for management.
     */
    public function index(): Response
    {
        $items = TimelineItem::query()->ordered()->get();

        return Inertia::render('dashboard/timeline', [
            'items' => $items->map(fn (TimelineItem $item): array => [
                'id' => $item->id,
                'period' => $item->period,
                'title' => $item->title,
                'description' => $item->description,
                'icon' => $item->icon,
                'highlighted' => $item->highlighted,
                'sortOrder' => $item->sort_order,
                'imageUrl' => $item->image_url,
                'videoUrl' => $item->video_url,
                'videoPosterUrl' => $item->video_poster_url,
            ]),
            'icons' => TimelineItem::ICONS,
        ]);
    }

    /**
     * Create a timeline item.
     */
    public function store(TimelineItemStoreRequest $request, UploadedImageProcessor $images): RedirectResponse
    {
        TimelineItem::create([
            ...$request->safe()->except(['image', 'video', 'video_poster']),
            // El checkbox desmarcado no viaja en la petición.
            'highlighted' => $request->boolean('highlighted'),
            'sort_order' => (TimelineItem::max('sort_order') ?? 0) + 1,
            'image_path' => $request->file('image') ? $images->store($request->file('image'), 'timeline') : null,
            'video_path' => $request->file('video')?->store('timeline', 'public'),
            'video_poster_path' => $request->file('video_poster') ? $images->store($request->file('video_poster'), 'timeline') : null,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Momento agregado a la historia.']);

        return to_route('timeline.index');
    }

    /**
     * Persist the new drag-and-drop order of the timeline items.
     */
    public function reorder(TimelineItemReorderRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request): void {
            foreach ($request->validated('ids') as $index => $id) {
                TimelineItem::whereKey($id)->update(['sort_order' => $index]);
            }
        });

        return back();
    }

    /**
     * Update a timeline item, replacing its image/video when a new one is uploaded.
     *
     * La imagen y el video son mutuamente excluyentes (ya forzado por la validación),
     * así que subir uno limpia los archivos del otro.
     */
    public function update(TimelineItemUpdateRequest $request, TimelineItem $timelineItem, UploadedImageProcessor $images): RedirectResponse
    {
        $data = $request->safe()->except(['image', 'video', 'video_poster']);
        $data['highlighted'] = $request->boolean('highlighted');

        if ($image = $request->file('image')) {
            $this->deleteAssets($timelineItem, image: true, video: true, poster: true);
            $data['image_path'] = $images->store($image, 'timeline');
            $data['video_path'] = null;
            $data['video_poster_path'] = null;
        } elseif ($video = $request->file('video')) {
            $this->deleteAssets($timelineItem, image: true, video: true, poster: (bool) $request->file('video_poster'));
            $data['image_path'] = null;
            $data['video_path'] = $video->store('timeline', 'public');

            if ($poster = $request->file('video_poster')) {
                $data['video_poster_path'] = $images->store($poster, 'timeline');
            }
        } elseif ($poster = $request->file('video_poster')) {
            $this->deleteAssets($timelineItem, image: false, video: false, poster: true);
            $data['video_poster_path'] = $images->store($poster, 'timeline');
        }

        $timelineItem->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Momento actualizado.']);

        return to_route('timeline.index');
    }

    /**
     * Delete a timeline item and its assets.
     */
    public function destroy(TimelineItem $timelineItem): RedirectResponse
    {
        $this->deleteAssets($timelineItem, image: true, video: true, poster: true);
        $timelineItem->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Momento eliminado de la historia.']);

        return to_route('timeline.index');
    }

    /**
     * Remove the selected stored assets from the public disk, if present.
     */
    private function deleteAssets(TimelineItem $timelineItem, bool $image, bool $video, bool $poster): void
    {
        if ($image && $timelineItem->image_path) {
            Storage::disk('public')->delete($timelineItem->image_path);
        }

        if ($video && $timelineItem->video_path) {
            Storage::disk('public')->delete($timelineItem->video_path);
        }

        if ($poster && $timelineItem->video_poster_path) {
            Storage::disk('public')->delete($timelineItem->video_poster_path);
        }
    }
}
