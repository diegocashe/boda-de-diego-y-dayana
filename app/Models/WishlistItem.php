<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string|null $image_path
 * @property int|null $image_width
 * @property int|null $image_height
 * @property string $status
 * @property int $sort_order
 * @property-read string|null $image_url
 */
class WishlistItem extends Model
{
    /**
     * Estados posibles de un artículo de la lista de deseos.
     *
     * @var list<string>
     */
    public const STATUSES = [
        'available',
        'reserved',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'image_path',
        'image_width',
        'image_height',
        'status',
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
            'image_width' => 'integer',
            'image_height' => 'integer',
            'sort_order' => 'integer',
        ];
    }

    /**
     * Scope the query to the display order of the wishlist.
     *
     * @param  Builder<self>  $query
     */
    public function scopeOrdered(Builder $query): void
    {
        $query->orderBy('sort_order')->orderBy('id');
    }

    /**
     * Public URL of the item's image, if one has been uploaded.
     */
    public function getImageUrlAttribute(): ?string
    {
        return $this->image_path ? Storage::disk('public')->url($this->image_path) : null;
    }
}
