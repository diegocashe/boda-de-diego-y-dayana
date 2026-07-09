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
     * Recodifica un archivo subido a WebP sin perder calidad ni redimensionar.
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
        $image = $manager->decodePath($sourcePath);

        $path = $directory.'/'.Str::uuid().'.webp';

        Storage::disk('public')->put(
            $path,
            (string) $image->encodeUsingMediaType('image/webp', quality: 100),
        );

        return $path;
    }
}
