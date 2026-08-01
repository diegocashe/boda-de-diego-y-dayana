<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\WishlistItemReorderRequest;
use App\Http\Requests\Dashboard\WishlistItemStoreRequest;
use App\Http\Requests\Dashboard\WishlistItemUpdateRequest;
use App\Models\WishlistItem;
use App\Services\UploadedImageProcessor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class WishlistItemController extends Controller
{
    /**
     * List the wishlist items for management.
     */
    public function index(): Response
    {
        $items = WishlistItem::query()->ordered()->get();

        return Inertia::render('dashboard/wishlist', [
            'items' => $items->map(fn (WishlistItem $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'description' => $item->description,
                'status' => $item->status,
                'sortOrder' => $item->sort_order,
                'imageUrl' => $item->image_url,
                'imageWidth' => $item->image_width,
                'imageHeight' => $item->image_height,
            ]),
        ]);
    }

    /**
     * Create a wishlist item.
     */
    public function store(WishlistItemStoreRequest $request, UploadedImageProcessor $images): RedirectResponse
    {
        $image = $images->store($request->file('image'), 'wishlist');

        WishlistItem::create([
            ...$request->safe()->except('image'),
            'status' => 'available',
            'sort_order' => (WishlistItem::max('sort_order') ?? 0) + 1,
            'image_path' => $image->path,
            'image_width' => $image->width,
            'image_height' => $image->height,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Artículo agregado a la lista de deseos.']);

        return to_route('wishlist.index');
    }

    /**
     * Persist the new drag-and-drop order of the wishlist items.
     */
    public function reorder(WishlistItemReorderRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request): void {
            foreach ($request->validated('ids') as $index => $id) {
                WishlistItem::whereKey($id)->update(['sort_order' => $index]);
            }
        });

        return back();
    }

    /**
     * Update a wishlist item, replacing its image when a new one is uploaded.
     */
    public function update(WishlistItemUpdateRequest $request, WishlistItem $wishlistItem, UploadedImageProcessor $images): RedirectResponse
    {
        $data = $request->safe()->except('image');

        if ($image = $request->file('image')) {
            if ($wishlistItem->image_path) {
                Storage::disk('public')->delete($wishlistItem->image_path);
            }

            $uploaded = $images->store($image, 'wishlist');
            $data['image_path'] = $uploaded->path;
            $data['image_width'] = $uploaded->width;
            $data['image_height'] = $uploaded->height;
        }

        $wishlistItem->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Artículo de la lista de deseos actualizado.']);

        return to_route('wishlist.index');
    }

    /**
     * Delete a wishlist item and its image.
     */
    public function destroy(WishlistItem $wishlistItem): RedirectResponse
    {
        if ($wishlistItem->image_path) {
            Storage::disk('public')->delete($wishlistItem->image_path);
        }

        $wishlistItem->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Artículo eliminado de la lista de deseos.']);

        return to_route('wishlist.index');
    }
}
