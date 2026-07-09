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

class RsvpNotificationMail extends Mailable implements ShouldQueue
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
        $status = $this->invitation->attending ? 'confirmó asistencia' : 'no podrá asistir';

        return new Envelope(
            subject: "{$this->invitation->guest_name} {$status}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.rsvp-notification',
            with: [
                'wedding' => WeddingSetting::current(),
            ],
        );
    }
}
