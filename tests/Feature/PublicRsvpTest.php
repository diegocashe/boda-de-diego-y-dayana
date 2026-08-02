<?php

namespace Tests\Feature;

use App\Mail\RsvpNotificationMail;
use App\Models\Invitation;
use App\Models\WeddingSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class PublicRsvpTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_rsvp_page_without_code_renders_the_fallback_state()
    {
        $response = $this->get(route('invitation.rsvp'));

        $response->assertOk();
    }

    public function test_the_rsvp_page_shows_the_guest_by_code()
    {
        $invitation = Invitation::factory()->create(['guest_name' => 'Familia Mendoza']);

        $response = $this->get(route('invitation.rsvp.show', $invitation));

        $response->assertOk();
        $response->assertSee('Familia Mendoza');
    }

    public function test_the_rsvp_page_includes_personalized_open_graph_tags()
    {
        $invitation = Invitation::factory()->create(['guest_name' => 'Familia Mendoza']);

        $response = $this->get(route('invitation.rsvp.show', $invitation));

        $response->assertOk();
        $response->assertSee('property="og:title"', false);
        $response->assertSee('Invitación para Familia Mendoza', false);
        $response->assertSee('Haz clic aquí para confirmar tu asistencia', false);
        $response->assertSee(route('invitation.og-image', $invitation), false);
        $response->assertSee(route('invitation.rsvp.show', $invitation), false);
    }

    public function test_an_invalid_code_returns_a_404()
    {
        $response = $this->get('/asistencia/no-existe');

        $response->assertNotFound();
    }

    public function test_a_guest_can_confirm_attendance()
    {
        $invitation = Invitation::factory()->create(['max_passes' => 4]);

        $response = $this->from(route('invitation.rsvp.show', $invitation))->post(route('invitation.rsvp.store', $invitation), [
            'attending' => 'yes',
            'guests' => 3,
            'message' => 'Ahi estaremos con mucho gusto.',
        ]);

        $response->assertRedirect(route('invitation.rsvp.show', $invitation));

        $invitation->refresh();
        $this->assertTrue($invitation->attending);
        $this->assertSame(3, $invitation->confirmed_passes);
        $this->assertSame('Ahi estaremos con mucho gusto.', $invitation->message);
        $this->assertNotNull($invitation->responded_at);
    }

    public function test_a_guest_can_decline_the_invitation()
    {
        $invitation = Invitation::factory()->create();

        $response = $this->post(route('invitation.rsvp.store', $invitation), [
            'attending' => 'no',
            'message' => 'Lo sentimos mucho.',
        ]);

        $response->assertSessionHasNoErrors();

        $invitation->refresh();
        $this->assertFalse($invitation->attending);
        $this->assertNull($invitation->confirmed_passes);
        $this->assertNotNull($invitation->responded_at);
    }

    public function test_declining_ignores_the_guests_field()
    {
        // Regresión: el formulario siempre envía "guests"; al declinar no debe
        // validarse contra los pases de la invitación.
        $invitation = Invitation::factory()->create(['max_passes' => 1]);

        $response = $this->post(route('invitation.rsvp.store', $invitation), [
            'attending' => 'no',
            'guests' => 2,
        ]);

        $response->assertSessionHasNoErrors();

        $invitation->refresh();
        $this->assertFalse($invitation->attending);
        $this->assertNull($invitation->confirmed_passes);
    }

    public function test_confirmed_passes_cannot_exceed_the_max_passes()
    {
        $invitation = Invitation::factory()->create(['max_passes' => 2]);

        $response = $this->post(route('invitation.rsvp.store', $invitation), [
            'attending' => 'yes',
            'guests' => 5,
        ]);

        $response->assertSessionHasErrors(['guests']);
        $this->assertNull($invitation->refresh()->attending);
    }

    public function test_a_guest_can_edit_an_unlocked_response()
    {
        $invitation = Invitation::factory()->responded()->create();

        $response = $this->post(route('invitation.rsvp.store', $invitation), [
            'attending' => 'no',
        ]);

        $response->assertSessionHasNoErrors();

        $invitation->refresh();
        $this->assertFalse($invitation->attending);
        $this->assertNull($invitation->confirmed_passes);
    }

    public function test_a_locked_invitation_rejects_new_responses()
    {
        $invitation = Invitation::factory()->responded()->locked()->create();

        $response = $this->post(route('invitation.rsvp.store', $invitation), [
            'attending' => 'no',
        ]);

        $response->assertForbidden();
        $this->assertTrue($invitation->refresh()->attending);
    }

    public function test_responding_notifies_the_configured_admin_emails()
    {
        Mail::fake();

        WeddingSetting::current()->update([
            'notification_emails' => ['pareja@correo.com', 'mama@correo.com'],
        ]);

        $invitation = Invitation::factory()->create(['max_passes' => 2]);

        $this->post(route('invitation.rsvp.store', $invitation), [
            'attending' => 'yes',
            'guests' => 2,
        ]);

        Mail::assertQueued(RsvpNotificationMail::class, 2);
        Mail::assertQueued(RsvpNotificationMail::class, fn ($mail) => $mail->hasTo('pareja@correo.com'));
        Mail::assertQueued(RsvpNotificationMail::class, fn ($mail) => $mail->hasTo('mama@correo.com'));
    }

    public function test_responding_without_configured_emails_sends_nothing()
    {
        Mail::fake();

        $invitation = Invitation::factory()->create();

        $this->post(route('invitation.rsvp.store', $invitation), [
            'attending' => 'no',
        ]);

        Mail::assertNothingQueued();
    }
}
