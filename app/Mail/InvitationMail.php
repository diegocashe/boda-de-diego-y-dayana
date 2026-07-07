<?php

namespace App\Mail;

use App\Models\Invitation;
use App\Models\WeddingSetting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvitationMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public Invitation $invitation,
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $wedding = WeddingSetting::current();

        return new Envelope(
            subject: "Estás invitado a la boda de {$wedding->bride_name} y {$wedding->groom_name}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.invitation',
            with: [
                'wedding' => WeddingSetting::current(),
                'rsvpUrl' => route('invitation.rsvp.show', $this->invitation),
            ],
        );
    }
}
