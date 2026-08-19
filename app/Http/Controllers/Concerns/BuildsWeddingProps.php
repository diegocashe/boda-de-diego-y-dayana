<?php

namespace App\Http\Controllers\Concerns;

use App\Models\Venue;
use App\Models\WeddingSetting;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

/**
 * Shared wedding data builders for the public invitation controllers.
 */
trait BuildsWeddingProps
{
    /**
     * Wedding data shared by the sections that display names, date and city.
     *
     * @return array<string, string>
     */
    private function weddingProps(WeddingSetting $wedding): array
    {
        return [
            'groomName' => $wedding->groom_name,
            'brideName' => $wedding->bride_name,
            'weddingAt' => $wedding->wedding_at->toIso8601String(),
            'city' => $wedding->city,
        ];
    }

    /**
     * Wedding date written out in Spanish, e.g. "17 de octubre de 2026".
     */
    private function weddingDate(WeddingSetting $wedding): string
    {
        Carbon::setLocale('es');

        return $wedding->wedding_at->isoFormat('D [de] MMMM [de] YYYY');
    }

    /**
     * Build the schema.org Event structured data shared by the public pages,
     * optionally attaching real venue locations when they're known.
     *
     * @param  Collection<int, Venue>|null  $venues
     * @return array<string, mixed>
     */
    private function weddingSchema(WeddingSetting $wedding, ?Collection $venues = null): array
    {
        $locations = $venues?->filter(fn (Venue $venue): bool => $venue->lat !== null && $venue->lng !== null)
            ->map(fn (Venue $venue): array => [
                '@type' => 'Place',
                'name' => $venue->name,
                'address' => [
                    '@type' => 'PostalAddress',
                    'addressLocality' => $wedding->city,
                ],
                'geo' => [
                    '@type' => 'GeoCoordinates',
                    'latitude' => $venue->lat,
                    'longitude' => $venue->lng,
                ],
            ])
            ->values()
            ->all();

        $location = ! empty($locations) ? (count($locations) === 1 ? $locations[0] : $locations) : [
            '@type' => 'Place',
            'name' => $wedding->city,
            'address' => [
                '@type' => 'PostalAddress',
                'addressLocality' => $wedding->city,
            ],
        ];

        return [
            '@context' => 'https://schema.org',
            '@type' => 'Event',
            'name' => "Boda de {$wedding->bride_name} y {$wedding->groom_name}",
            'startDate' => $wedding->wedding_at->toIso8601String(),
            'eventAttendanceMode' => 'https://schema.org/OfflineEventAttendanceMode',
            'eventStatus' => 'https://schema.org/EventScheduled',
            'location' => $location,
            'image' => [asset('img/og-invitation.jpg')],
            'description' => "{$wedding->bride_name} y {$wedding->groom_name} se casan el {$this->weddingDate($wedding)} en {$wedding->city}.",
            'organizer' => [
                '@type' => 'Person',
                'name' => "{$wedding->bride_name} & {$wedding->groom_name}",
            ],
        ];
    }
}
