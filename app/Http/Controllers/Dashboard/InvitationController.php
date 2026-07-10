<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\InvitationStoreRequest;
use App\Http\Requests\Dashboard\InvitationUpdateRequest;
use App\Mail\InvitationMail;
use App\Models\Invitation;
use App\Services\InvitationOgImageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

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
                'attendanceMode' => $invitation->attendance_mode,
                'attending' => $invitation->attending,
                'confirmedPasses' => $invitation->confirmed_passes,
                'dietary' => $invitation->dietary,
                'message' => $invitation->message,
                'respondedAt' => $invitation->responded_at?->toIso8601String(),
                'sentAt' => $invitation->sent_at?->toIso8601String(),
                'isLocked' => $invitation->is_locked,
                'rsvpUrl' => route('invitation.rsvp.show', $invitation),
                'ogImageUrl' => route('invitation.og-image', $invitation).'?v='.$invitation->updated_at->timestamp,
            ]),
        ]);
    }

    /**
     * Export every guest's RSVP response as a downloadable CSV.
     */
    public function export(): StreamedResponse
    {
        $filename = 'invitaciones-'.now()->format('Y-m-d').'.csv';

        return response()->streamDownload(function (): void {
            $handle = fopen('php://output', 'w');

            if ($handle === false) {
                return;
            }

            fputcsv($handle, [
                'Invitado',
                'Email',
                'Código',
                'Pases máximos',
                'Modalidad',
                'Asistencia',
                'Pases confirmados',
                'Restricción alimentaria',
                'Mensaje',
                'Respondido el',
                'Enviado el',
            ]);

            Invitation::query()->latest()->each(function (Invitation $invitation) use ($handle): void {
                fputcsv($handle, [
                    self::sanitizeCsvCell($invitation->guest_name),
                    self::sanitizeCsvCell($invitation->email),
                    $invitation->code,
                    $invitation->max_passes,
                    $invitation->attendance_mode === 'online' ? 'Online' : 'Presencial',
                    match ($invitation->attending) {
                        true => 'Sí',
                        false => 'No',
                        default => 'Sin responder',
                    },
                    $invitation->confirmed_passes,
                    self::sanitizeCsvCell($invitation->dietary),
                    self::sanitizeCsvCell($invitation->message),
                    $invitation->responded_at?->format('Y-m-d H:i'),
                    $invitation->sent_at?->format('Y-m-d H:i'),
                ]);
            });

            fclose($handle);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    /**
     * Prevent CSV formula injection by neutralizing leading characters that
     * spreadsheet apps (Excel, Sheets) interpret as formula/DDE triggers.
     */
    private static function sanitizeCsvCell(?string $value): ?string
    {
        if ($value === null || $value === '') {
            return $value;
        }

        if (preg_match('/^[=+\-@\t\r]/', $value) === 1) {
            return "'".$value;
        }

        return $value;
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

        // El nombre pudo cambiar; la imagen compartible se regenera en el próximo request.
        Storage::disk('public')->delete("og/{$invitation->code}.jpg");

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Invitación actualizada.']);

        return to_route('invitations.index');
    }

    /**
     * Delete an invitation.
     */
    public function destroy(Invitation $invitation): RedirectResponse
    {
        Storage::disk('public')->delete("og/{$invitation->code}.jpg");
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

    /**
     * Regenerate the shareable OG image for an invitation on demand.
     */
    public function regenerateOgImage(Invitation $invitation, InvitationOgImageService $ogImages): RedirectResponse
    {
        $ogImages->regenerate($invitation);
        $invitation->touch();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Imagen regenerada.']);

        return to_route('invitations.index');
    }
}
