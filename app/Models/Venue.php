<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $label
 * @property string $name
 * @property string $schedule
 * @property float|null $lat
 * @property float|null $lng
 * @property string $icon
 * @property string $accent
 * @property int $sort_order
 */
class Venue extends Model
{
    /**
     * Icons the dashboard can assign to a venue; the frontend maps these
     * names to lucide components.
     *
     * @var list<string>
     */
    public const ICONS = [
        'church',
        'calendar',
        'map-pin',
        'gem',
        'heart',
        'gift',
    ];

    /**
     * Accent color themes available for a venue card.
     *
     * @var list<string>
     */
    public const ACCENTS = [
        'wine',
        'sage',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'label',
        'name',
        'schedule',
        'lat',
        'lng',
        'icon',
        'accent',
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
            'lat' => 'float',
            'lng' => 'float',
            'sort_order' => 'integer',
        ];
    }

    /**
     * Scope the query to the display order of the venues.
     *
     * @param  Builder<self>  $query
     */
    public function scopeOrdered(Builder $query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }
}
