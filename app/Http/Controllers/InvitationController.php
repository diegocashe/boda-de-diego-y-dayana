<?php

namespace App\Http\Controllers;

use App\Http\Requests\RsvpStoreRequest;
use App\Mail\RsvpNotificationMail;
use App\Models\GiftRegistryEntry;
use App\Models\Invitation;
use App\Models\TimelineItem;
use App\Models\Venue;
use App\Models\WeddingSetting;
use App\Services\InvitationOgImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class InvitationController extends Controller
{
    /**
     * Show the landing section of the public invitation.
     */
    public function home(): Response
    {
        $wedding = WeddingSetting::current();

        return Inertia::render('invitation/home', [
            'wedding' => $this->weddingProps($wedding),
            'content' => [
                'heroEyebrow' => $wedding->hero_eyebrow,
                'heroScrollHint' => $wedding->hero_scroll_hint,
                'countdownEyebrow' => $wedding->countdown_eyebrow,
                'countdownHeading' => $wedding->countdown_heading,
                'ctaHeading' => $wedding->cta_heading,
                'ctaParagraph' => $wedding->cta_paragraph,
                'ctaButtonLabel' => $wedding->cta_button_label,
            ],
        ])->withViewData([
            'meta' => [
                'description' => "{$wedding->bride_name} y {$wedding->groom_name} se casan el {$this->weddingDate($wedding)} en {$wedding->city}. Te esperamos para celebrar juntos.",
            ],
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
            'wedding' => $this->weddingProps(WeddingSetting::current()),
            'guest' => null,
        ]);
    }

    /**
     * Show the RSVP section personalized for the invitation code.
     */
    public function rsvpShow(Invitation $invitation): Response
    {
        $wedding = WeddingSetting::current();

        return Inertia::render('invitation/rsvp', [
            'wedding' => $this->weddingProps($wedding),
            'guest' => [
                'name' => $invitation->guest_name,
                'code' => $invitation->code,
                'maxPasses' => $invitation->max_passes,
                'locked' => $invitation->is_locked,
                'videoUrl' => null,
                'response' => $invitation->responded_at ? [
                    'attending' => $invitation->attending ? 'yes' : 'no',
                    'guests' => $invitation->confirmed_passes ?? 1,
                    'dietary' => $invitation->dietary ?? '',
                    'message' => $invitation->message ?? '',
                ] : null,
            ],
        ])->withViewData([
            'meta' => [
                'title' => "Invitación para {$invitation->guest_name} · {$wedding->bride_name} & {$wedding->groom_name}",
                'description' => "{$invitation->guest_name}, {$wedding->bride_name} y {$wedding->groom_name} te invitan a su boda el {$this->weddingDate($wedding)} en {$wedding->city}. Haz clic aquí para confirmar tu asistencia.",
                'image' => route('invitation.og-image', $invitation),
                'url' => route('invitation.rsvp.show', $invitation),
            ],
        ]);
    }

    /**
     * Serve the dynamically generated Open Graph image for this invitation,
     * generating and caching it on first request.
     */
    public function ogImage(Invitation $invitation, InvitationOgImageService $ogImages): BinaryFileResponse
    {
        $ogImages->ensureGenerated($invitation);

        return response()->file(
            Storage::disk('public')->path("og/{$invitation->code}.jpg"),
            ['Content-Type' => 'image/jpeg', 'Cache-Control' => 'public, max-age=86400'],
        );
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

        $this->notifyRsvpResponse($invitation);

        return back();
    }

    /**
     * Alert the configured admin emails whenever a guest responds to their RSVP.
     */
    private function notifyRsvpResponse(Invitation $invitation): void
    {
        foreach (WeddingSetting::current()->notification_emails ?? [] as $email) {
            Mail::to($email)->queue(new RsvpNotificationMail($invitation));
        }
    }

    /**
     * Show the venue and gift details section.
     */
    public function details(): Response
    {
        $wedding = WeddingSetting::current();

        return Inertia::render('invitation/details', [
            'venues' => Venue::query()->ordered()->get()->map(fn (Venue $venue): array => [
                'id' => $venue->id,
                'label' => $venue->label,
                'name' => $venue->name,
                'schedule' => $venue->schedule,
                'lat' => $venue->lat,
                'lng' => $venue->lng,
                'icon' => $venue->icon,
                'accent' => $venue->accent,
            ]),
            'giftRegistry' => GiftRegistryEntry::query()->ordered()->get()->map(fn (GiftRegistryEntry $entry): array => [
                'label' => $entry->label,
                'value' => $entry->value,
            ]),
            'godparents' => [
                'whatsappUrl' => $wedding->godparents_whatsapp ? "https://wa.me/{$wedding->godparents_whatsapp}" : null,
                'phoneUrl' => $wedding->godparents_phone ? "tel:{$wedding->godparents_phone}" : null,
            ],
        ]);
    }

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
}
