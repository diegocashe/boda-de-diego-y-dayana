<?php

namespace App\Services;

readonly class UploadedImage
{
    public function __construct(
        public string $path,
        public int $width,
        public int $height,
    ) {}
}
