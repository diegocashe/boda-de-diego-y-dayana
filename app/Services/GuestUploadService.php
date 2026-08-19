<?php

namespace App\Services;

use App\Models\GuestUpload;
use App\Models\Invitation;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

/**
 * Stores photos and videos guests upload from their own devices, kept in a
 * dedicated folder per invitation, separate from any other app uploads.
 */
class GuestUploadService
{
    private const DISK = 'public';

    /**
     * Save the uploaded file as-is (no re-encoding) and record it.
     */
    public function store(Invitation $invitation, UploadedFile $file): GuestUpload
    {
        $type = str_starts_with((string) $file->getMimeType(), 'video/') ? 'video' : 'image';
        $filename = Str::uuid()->toString().'.'.$file->getClientOriginalExtension();
        $path = $file->storeAs("guest-uploads/{$invitation->code}", $filename, self::DISK);

        return $invitation->uploads()->create([
            'type' => $type,
            'disk' => self::DISK,
            'path' => $path,
            'original_filename' => $file->getClientOriginalName(),
            'mime_type' => (string) $file->getMimeType(),
            'size' => $file->getSize(),
        ]);
    }
}
