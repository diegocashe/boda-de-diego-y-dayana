<?php

namespace App\Services;

use App\Models\Invitation;
use App\Models\WeddingSetting;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class InvitationOgImageService
{
    private const WIDTH = 1200;

    private const HEIGHT = 630;

    /**
     * Public URL of the OG image for this invitation, generating it first if needed.
     */
    public function urlFor(Invitation $invitation): string
    {
        $this->ensureGenerated($invitation);

        return Storage::disk('public')->url($this->relativePath($invitation));
    }

    /**
     * Generate the OG image for this invitation if it isn't cached yet.
     */
    public function ensureGenerated(Invitation $invitation): void
    {
        if (! Storage::disk('public')->exists($this->relativePath($invitation))) {
            $this->generate($invitation);
        }
    }

    /**
     * Force-regenerate the OG image, discarding any cached version.
     */
    public function regenerate(Invitation $invitation): void
    {
        Storage::disk('public')->delete($this->relativePath($invitation));
        $this->generate($invitation);
    }

    /**
     * Drop every cached OG image, e.g. after the shared background photo changes.
     */
    public function invalidateAll(): void
    {
        Storage::disk('public')->deleteDirectory('og');
    }

    private function generate(Invitation $invitation): void
    {
        $wedding = WeddingSetting::current();
        $manager = new ImageManager(Driver::class);

        $backgroundPath = $wedding->og_background_path
            ? Storage::disk('public')->path($wedding->og_background_path)
            : public_path('img/og-invitation.jpg');

        $image = $manager->decodePath($backgroundPath)->cover(self::WIDTH, self::HEIGHT);

        // Franja oscura en la base para que el texto sea legible sobre cualquier foto.
        $image->drawRectangle(function ($rectangle) {
            $rectangle->size(self::WIDTH, 220);
            $rectangle->at(0, self::HEIGHT - 220);
            $rectangle->background('rgba(20, 16, 12, 0.6)');
        });

        $nameFontSize = mb_strlen($invitation->guest_name) > 22 ? 48 : 64;

        $image->text("Para {$invitation->guest_name}", (int) (self::WIDTH / 2), self::HEIGHT - 130, function ($font) use ($nameFontSize) {
            $font->filename(resource_path('fonts/Cormorant_Garamond/static/CormorantGaramond-SemiBold.ttf'));
            $font->size($nameFontSize);
            $font->color('#ffffff');
            $font->align('center', 'center');
            $font->wrap(self::WIDTH - 120);
        });

        $signature = "Con cariño, de {$wedding->groom_name} y {$wedding->bride_name}";
        $signatureFontSize = mb_strlen($signature) > 24 ? 24 : 30;

        $image->text($signature, (int) (self::WIDTH / 2), self::HEIGHT - 60, function ($font) use ($signatureFontSize) {
            $font->filename(resource_path('fonts/Cormorant_Garamond/static/CormorantGaramond-Medium.ttf'));
            $font->size($signatureFontSize);
            $font->color('#f0e6d8');
            $font->align('center', 'center');
        });

        Storage::disk('public')->put(
            $this->relativePath($invitation),
            (string) $image->encodeUsingMediaType('image/jpeg', quality: 78),
        );
    }

    private function relativePath(Invitation $invitation): string
    {
        return "og/{$invitation->code}.jpg";
    }
}
