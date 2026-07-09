<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property string $groom_name
 * @property string $bride_name
 * @property Carbon $wedding_at
 * @property string $city
 * @property string|null $og_background_path
 * @property-read string|null $og_background_url
 * @property list<string> $notification_emails
 * @property string $hero_eyebrow
 * @property string $hero_scroll_hint
 * @property string $countdown_eyebrow
 * @property string $countdown_heading
 * @property string $cta_heading
 * @property string $cta_paragraph
 * @property string $cta_button_label
 */
class WeddingSetting extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'groom_name',
        'bride_name',
        'wedding_at',
        'city',
        'og_background_path',
        'notification_emails',
        'hero_eyebrow',
        'hero_scroll_hint',
        'countdown_eyebrow',
        'countdown_heading',
        'cta_heading',
        'cta_paragraph',
        'cta_button_label',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'wedding_at' => 'datetime',
            'notification_emails' => 'array',
        ];
    }

    /**
     * The application manages a single wedding, so the settings live in one row
     * that gets created with sensible defaults on first access.
     */
    public static function current(): self
    {
        return self::query()->first() ?? self::query()->create([
            'groom_name' => 'Diego',
            'bride_name' => 'Dayana',
            'wedding_at' => '2026-10-17 17:00:00',
            'city' => 'Ciudad de México',
        ]);
    }

    /**
     * Public URL of the background photo used for the shareable OG images, if uploaded.
     */
    public function getOgBackgroundUrlAttribute(): ?string
    {
        return $this->og_background_path ? Storage::disk('public')->url($this->og_background_path) : null;
    }
}
