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

    private const QUALITY = 75;

    /**
     * Recodifica un archivo subido a WebP, recortando resolución y calidad
     * a un tope razonable para la web.
     */
    public function store(UploadedFile $file, string $directory): UploadedImage
    {
        return $this->convert($file->getRealPath(), $directory);
    }

    /**
     * Recodifica una imagen ya guardada en el disco 'public' a WebP in situ.
     */
    public function reencodeExisting(string $existingPath): UploadedImage
    {
        $directory = Str::beforeLast($existingPath, '/');
        $newImage = $this->convert(Storage::disk('public')->path($existingPath), $directory);
        Storage::disk('public')->delete($existingPath);

        return $newImage;
    }

    /**
     * Si es false, el archivo ya está en WebP y dentro del tope de resolución;
     * no hace falta volver a procesarlo. Detecta también WebP "mal" generados
     * por una versión previa del optimizador que no aplicaba el resize.
     */
    public function needsOptimization(string $path): bool
    {
        if (! Str::endsWith($path, '.webp')) {
            return true;
        }

        $size = getimagesize(Storage::disk('public')->path($path));

        if ($size === false) {
            return true;
        }

        [$width, $height] = $size;

        return $width > self::MAX_DIMENSION || $height > self::MAX_DIMENSION;
    }

    private function convert(string $sourcePath, string $directory): UploadedImage
    {
        $manager = new ImageManager(Driver::class);
        $image = $manager->decodePath($sourcePath)->scaleDown(self::MAX_DIMENSION, self::MAX_DIMENSION);

        $path = $directory.'/'.Str::uuid().'.webp';

        Storage::disk('public')->put(
            $path,
            (string) $image->encodeUsingMediaType('image/webp', quality: self::QUALITY),
        );

        return new UploadedImage($path, $image->width(), $image->height());
    }
}
