<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class UploadedImageProcessor
{
    /**
     * Lado máximo (px) tras el resize; evita fotos de cámara/celular (20+ MP)
     * agotando el memory_limit de PHP en el hosting compartido al decodificarlas.
     */
    private const MAX_DIMENSION = 2000;

    private const QUALITY = 82;

    /**
     * Recodifica un archivo subido a WebP, recortando resolución y calidad
     * a un tope razonable para la web.
     */
    public function store(UploadedFile $file, string $directory): string
    {
        return $this->convert($file->getRealPath(), $directory);
    }

    /**
     * Recodifica una imagen ya guardada en el disco 'public' a WebP in situ.
     * Devuelve el nuevo path, o null si ya estaba en WebP.
     */
    public function reencodeExisting(string $existingPath): ?string
    {
        if (Str::endsWith($existingPath, '.webp')) {
            return null;
        }

        $directory = Str::beforeLast($existingPath, '/');
        $newPath = $this->convert(Storage::disk('public')->path($existingPath), $directory);
        Storage::disk('public')->delete($existingPath);

        return $newPath;
    }

    private function convert(string $sourcePath, string $directory): string
    {
        $manager = new ImageManager(Driver::class);
        $image = $manager->decodePath($sourcePath)->scaleDown(self::MAX_DIMENSION, self::MAX_DIMENSION);

        $path = $directory.'/'.Str::uuid().'.webp';

        Storage::disk('public')->put(
            $path,
            (string) $image->encodeUsingMediaType('image/webp', quality: self::QUALITY),
        );

        return $path;
    }
}
