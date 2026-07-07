<?php

namespace App\Http\Controllers;

use App\Http\Requests\RsvpStoreRequest;
use App\Models\Invitation;
use App\Models\TimelineItem;
use App\Models\WeddingSetting;
use Illuminate\Http\RedirectResponse;
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
     * Show the RSVP section without a personal code; the page explains that
     * the guest must use the link from their invitation email.
     */
    public function rsvp(): Response
    {
        return Inertia::render('invitation/rsvp', [
            'wedding' => $this->weddingProps(),
            'guest' => null,
        ]);
    }

    /**
     * Show the RSVP section personalized for the invitation code.
     */
    public function rsvpShow(Invitation $invitation): Response
    {
        return Inertia::render('invitation/rsvp', [
            'wedding' => $this->weddingProps(),
            'guest' => [
                'name' => $invitation->guest_name,
                'code' => $invitation->code,
                'maxPasses' => $invitation->max_passes,
                'locked' => $invitation->is_locked,
                'videoUrl' => null,
                'videoMessage' => 'Grabamos este video con todo nuestro cariño para invitarte de manera especial. ¡Esperamos verte para celebrar juntos!',
                'response' => $invitation->responded_at ? [
                    'attending' => $invitation->attending ? 'yes' : 'no',
                    'guests' => $invitation->confirmed_passes ?? 1,
                    'dietary' => $invitation->dietary ?? '',
                    'message' => $invitation->message ?? '',
                ] : null,
            ],
        ]);
    }

    /**
     * Save the guest's response; it stays editable until the invitation is locked.
     */
    public function rsvpStore(RsvpStoreRequest $request, Invitation $invitation): RedirectResponse
    {
        abort_if($invitation->is_locked, 403);

        $attending = $request->input('attending') === 'yes';

        $invitation->update([
            'attending' => $attending,
            'confirmed_passes' => $attending ? $request->integer('guests') : null,
            'dietary' => $attending ? $request->input('dietary') : null,
            'message' => $request->input('message'),
            'responded_at' => now(),
        ]);

        return back();
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
