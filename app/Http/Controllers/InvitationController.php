<?php

namespace App\Http\Controllers;

use App\Models\TimelineItem;
use App\Models\WeddingSetting;
use Inertia\Inertia;
use Inertia\Response;

class InvitationController extends Controller
{
    /**
     * Show the landing section of the public invitation.
     */
    public function home(): Response
    {
        return Inertia::render('invitation/home', [
            'wedding' => $this->weddingProps(),
        ]);
    }

    /**
     * Show the couple's story timeline.
     */
    public function story(): Response
    {
        return Inertia::render('invitation/story', [
            'milestones' => TimelineItem::query()->ordered()->get()->map(fn (TimelineItem $item): array => [
                'id' => $item->id,
                'period' => $item->period,
                'title' => $item->title,
                'description' => $item->description,
                'icon' => $item->icon,
                'highlighted' => $item->highlighted,
                'imageUrl' => $item->image_url,
            ]),
        ]);
    }

    /**
     * Show the RSVP section.
     */
    public function rsvp(): Response
    {
        return Inertia::render('invitation/rsvp', [
            'wedding' => $this->weddingProps(),
            // Invitado de demostración; vendrá de la tabla de invitados en futuras versiones.
            'guest' => [
                'name' => 'Familia Mendoza',
                'maxPasses' => 4,
                'videoUrl' => null,
                'videoMessage' => 'Grabamos este video con todo nuestro cariño para invitarte de manera especial. ¡Esperamos verte para celebrar juntos!',
            ],
        ]);
    }

    /**
     * Show the venue and gift details section.
     */
    public function details(): Response
    {
        return Inertia::render('invitation/details');
    }

    /**
     * Wedding data shared by the sections that display names, date and city.
     *
     * @return array<string, string>
     */
    private function weddingProps(): array
    {
        $wedding = WeddingSetting::current();

        return [
            'groomName' => $wedding->groom_name,
            'brideName' => $wedding->bride_name,
            'weddingAt' => $wedding->wedding_at->toIso8601String(),
            'city' => $wedding->city,
        ];
    }
}
