<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\InvitationStoreRequest;
use App\Http\Requests\Dashboard\InvitationUpdateRequest;
use App\Mail\InvitationMail;
use App\Models\Invitation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class InvitationController extends Controller
{
    /**
     * List the invitations for management.
     */
    public function index(): Response
    {
        return Inertia::render('dashboard/invitations', [
            'invitations' => Invitation::query()->latest()->get()->map(fn (Invitation $invitation): array => [
                'id' => $invitation->id,
                'guestName' => $invitation->guest_name,
                'email' => $invitation->email,
                'code' => $invitation->code,
                'maxPasses' => $invitation->max_passes,
                'attending' => $invitation->attending,
                'confirmedPasses' => $invitation->confirmed_passes,
                'dietary' => $invitation->dietary,
                'message' => $invitation->message,
                'respondedAt' => $invitation->responded_at?->toIso8601String(),
                'sentAt' => $invitation->sent_at?->toIso8601String(),
                'isLocked' => $invitation->is_locked,
                'rsvpUrl' => route('invitation.rsvp.show', $invitation),
            ]),
        ]);
    }

    /**
     * Create an invitation; the personal code is generated automatically.
     */
    public function store(InvitationStoreRequest $request): RedirectResponse
    {
        Invitation::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Invitación creada.']);

        return to_route('invitations.index');
    }

    /**
     * Update the guest data of an invitation.
     */
    public function update(InvitationUpdateRequest $request, Invitation $invitation): RedirectResponse
    {
        $invitation->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Invitación actualizada.']);

        return to_route('invitations.index');
    }

    /**
     * Delete an invitation.
     */
    public function destroy(Invitation $invitation): RedirectResponse
    {
        $invitation->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Invitación eliminada.']);

        return to_route('invitations.index');
    }

    /**
     * Queue the invitation email with the personal RSVP link. Serves both the
     * first send and any resend, refreshing the sent timestamp.
     */
    public function send(Invitation $invitation): RedirectResponse
    {
        if ($invitation->email === null) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Agrega un correo antes de enviar la invitación.']);

            return to_route('invitations.index');
        }

        Mail::to($invitation->email)->queue(new InvitationMail($invitation));

        $invitation->update(['sent_at' => now()]);

        Inertia::flash('toast', ['type' => 'success', 'message' => "Invitación enviada a {$invitation->email}."]);

        return to_route('invitations.index');
    }

    /**
     * Block or reopen the guest's ability to change their response.
     */
    public function toggleLock(Invitation $invitation): RedirectResponse
    {
        $invitation->update(['is_locked' => ! $invitation->is_locked]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $invitation->is_locked ? 'Respuesta bloqueada.' : 'Respuesta desbloqueada.',
        ]);

        return to_route('invitations.index');
    }
}
