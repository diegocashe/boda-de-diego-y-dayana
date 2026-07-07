<?php

namespace Tests\Feature;

use App\Models\Invitation;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
            'dietary' => 'Sin gluten',
            'message' => 'Ahi estaremos con mucho gusto.',
        ]);

        $response->assertRedirect(route('invitation.rsvp.show', $invitation));

        $invitation->refresh();
        $this->assertTrue($invitation->attending);
        $this->assertSame(3, $invitation->confirmed_passes);
        $this->assertSame('Sin gluten', $invitation->dietary);
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
        $this->assertNull($invitation->dietary);
        $this->assertNotNull($invitation->responded_at);
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
}
