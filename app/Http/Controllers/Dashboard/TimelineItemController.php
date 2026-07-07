<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\TimelineItemStoreRequest;
use App\Http\Requests\Dashboard\TimelineItemUpdateRequest;
use App\Models\TimelineItem;
use Illuminate\Http\RedirectResponse;
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
        return Inertia::render('dashboard/timeline', [
            'items' => TimelineItem::query()->ordered()->get()->map(fn (TimelineItem $item): array => [
                'id' => $item->id,
                'period' => $item->period,
                'title' => $item->title,
                'description' => $item->description,
                'icon' => $item->icon,
                'highlighted' => $item->highlighted,
                'sortOrder' => $item->sort_order,
                'imageUrl' => $item->image_url,
            ]),
            'icons' => TimelineItem::ICONS,
        ]);
    }

    /**
     * Create a timeline item.
     */
    public function store(TimelineItemStoreRequest $request): RedirectResponse
    {
        TimelineItem::create([
            ...$request->safe()->except('image'),
            // El checkbox desmarcado no viaja en la petición.
            'highlighted' => $request->boolean('highlighted'),
            'image_path' => $request->file('image')?->store('timeline', 'public'),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Momento agregado a la historia.']);

        return to_route('timeline.index');
    }

    /**
     * Update a timeline item, replacing its image when a new one is uploaded.
     */
    public function update(TimelineItemUpdateRequest $request, TimelineItem $timelineItem): RedirectResponse
    {
        $data = $request->safe()->except('image');
        $data['highlighted'] = $request->boolean('highlighted');

        if ($image = $request->file('image')) {
            $this->deleteImage($timelineItem);
            $data['image_path'] = $image->store('timeline', 'public');
        }

        $timelineItem->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Momento actualizado.']);

        return to_route('timeline.index');
    }

    /**
     * Delete a timeline item and its image.
     */
    public function destroy(TimelineItem $timelineItem): RedirectResponse
    {
        $this->deleteImage($timelineItem);
        $timelineItem->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Momento eliminado de la historia.']);

        return to_route('timeline.index');
    }

    /**
     * Remove the stored image from the public disk, if any.
     */
    private function deleteImage(TimelineItem $timelineItem): void
    {
        if ($timelineItem->image_path) {
            Storage::disk('public')->delete($timelineItem->image_path);
        }
    }
}
