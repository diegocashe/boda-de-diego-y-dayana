<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $period
 * @property string $title
 * @property string $description
 * @property string $icon
 * @property bool $highlighted
 * @property string|null $image_path
 * @property string|null $video_path
 * @property string|null $video_poster_path
 * @property int $sort_order
 * @property-read string|null $image_url
 * @property-read string|null $video_url
 * @property-read string|null $video_poster_url
 */
class TimelineItem extends Model
{
    /**
     * Icons the dashboard can assign to a milestone; the frontend maps these
     * names to lucide components.
     *
     * @var list<string>
     */
    public const ICONS = [
        'coffee',
        'plane',
        'home',
        'gem',
        'heart',
        'church',
        'calendar',
        'map-pin',
        'camera',
        'music',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'period',
        'title',
        'description',
        'icon',
        'highlighted',
        'image_path',
        'video_path',
        'video_poster_path',
        'sort_order',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'highlighted' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    /**
     * Scope the query to the display order of the timeline.
     *
     * @param  Builder<self>  $query
     */
    public function scopeOrdered(Builder $query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }

    /**
     * Public URL of the milestone image, if one has been uploaded.
     */
    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path ? Storage::disk('public')->url($this->image_path) : null;
    }

    /**
     * Public URL of the milestone video, if one has been uploaded.
     */
    public function getVideoUrlAttribute(): ?string
    {
        return $this->video_path ? Storage::disk('public')->url($this->video_path) : null;
    }

    /**
     * Public URL of the milestone video's poster image, if one has been uploaded.
     */
    public function getVideoPosterUrlAttribute(): ?string
    {
        return $this->video_poster_path ? Storage::disk('public')->url($this->video_poster_path) : null;
    }
}
