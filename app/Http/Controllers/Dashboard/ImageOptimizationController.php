<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\TimelineItem;
use App\Models\WeddingSetting;
use App\Services\UploadedImageProcessor;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class ImageOptimizationController extends Controller
{
    /**
     * Cuántas imágenes recodificar por request: mantiene cada request corto y
     * con memoria acotada en el hosting compartido. El frontend vuelve a
     * llamar este endpoint hasta que no queda nada pendiente.
     */
    private const BATCH_SIZE = 4;

    /**
     * Recodifica a WebP un lote de imágenes pendientes: sin convertir, o ya
     * en WebP pero por encima del tope de resolución (p.ej. generadas por una
     * versión anterior del optimizador). Stateless: cada llamada vuelve a
     * calcular lo que falta.
     */
    public function optimize(UploadedImageProcessor $images): RedirectResponse
    {
        $pending = $this->pendingTargets($images);
        $batch = $pending->take(self::BATCH_SIZE);
        $remaining = $pending->count() - $batch->count();

        foreach ($batch as $target) {
            $new = $images->reencodeExisting($target['path']);

            $data = [$target['column'] => $new->path];

            if ($target['column'] === 'image_path') {
                $data['image_width'] = $new->width;
                $data['image_height'] = $new->height;
            }

            $target['model']->update($data);
        }

        Inertia::flash('imageOptimization', ['remaining' => $remaining]);

        if ($remaining === 0 && $batch->isNotEmpty()) {
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Imágenes optimizadas.']);
        }

        return back();
    }

    /**
     * @return Collection<int, array{model: Model, column: string, path: string}>
     */
    private function pendingTargets(UploadedImageProcessor $images): Collection
    {
        $targets = collect();

        $items = TimelineItem::query()
            ->whereNotNull('image_path')
            ->orWhereNotNull('video_poster_path')
            ->get();

        foreach ($items as $item) {
            foreach (['image_path', 'video_poster_path'] as $column) {
                $path = $item->{$column};

                if ($path && $images->needsOptimization($path)) {
                    $targets->push(['model' => $item, 'column' => $column, 'path' => $path]);
                }
            }
        }

        $wedding = WeddingSetting::current();

        if ($wedding->og_background_path && $images->needsOptimization($wedding->og_background_path)) {
            $targets->push(['model' => $wedding, 'column' => 'og_background_path', 'path' => $wedding->og_background_path]);
        }

        return $targets;
    }
}
