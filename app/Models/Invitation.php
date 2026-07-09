<?php

namespace App\Models;

use Database\Factories\InvitationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $guest_name
 * @property string|null $relationship
 * @property string|null $email
 * @property string $code
 * @property int $max_passes
 * @property bool|null $attending
 * @property int|null $confirmed_passes
 * @property int|null $table_number
 * @property string|null $dietary
 * @property string|null $message
 * @property Carbon|null $responded_at
 * @property Carbon|null $sent_at
 * @property bool $is_locked
 */
class Invitation extends Model
{
    /** @use HasFactory<InvitationFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'guest_name',
        'relationship',
        'email',
        'code',
        'max_passes',
        'attending',
        'confirmed_passes',
        'table_number',
        'dietary',
        'message',
        'responded_at',
        'sent_at',
        'is_locked',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'max_passes' => 'integer',
            'attending' => 'boolean',
            'confirmed_passes' => 'integer',
            'table_number' => 'integer',
            'responded_at' => 'datetime',
            'sent_at' => 'datetime',
            'is_locked' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $invitation): void {
            $invitation->code ??= self::generateCode();
        });
    }

    /**
     * Generate a unique URL-safe code for the guest's personal RSVP link.
     */
    public static function generateCode(): string
    {
        do {
            $code = Str::lower(Str::random(10));
        } while (self::query()->where('code', $code)->exists());

        return $code;
    }
}
