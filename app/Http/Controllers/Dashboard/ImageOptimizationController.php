<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\TimelineItem;
use App\Models\WeddingSetting;
use App\Services\UploadedImageProcessor;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ImageOptimizationController extends Controller
{
    /**
     * Recodifica a WebP las imágenes ya subidas antes de que existiera esta conversión.
     */
    public function optimize(UploadedImageProcessor $images): RedirectResponse
    {
        $converted = 0;

        $items = TimelineItem::query()
            ->whereNotNull('image_path')
            ->orWhereNotNull('video_poster_path')
            ->get();

        foreach ($items as $item) {
            $updates = [];

            if ($item->image_path && $new = $images->reencodeExisting($item->image_path)) {
                $updates['image_path'] = $new;
            }

            if ($item->video_poster_path && $new = $images->reencodeExisting($item->video_poster_path)) {
                $updates['video_poster_path'] = $new;
            }

            if ($updates) {
                $item->update($updates);
                $converted += count($updates);
            }
        }

        $wedding = WeddingSetting::current();

        if ($wedding->og_background_path && $new = $images->reencodeExisting($wedding->og_background_path)) {
            $wedding->update(['og_background_path' => $new]);
            $converted++;
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => "Se optimizaron {$converted} imágenes."]);

        return back();
    }
}
