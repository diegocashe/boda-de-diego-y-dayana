<?php

namespace Tests\Feature\Dashboard;

use App\Mail\InvitationMail;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class InvitationsTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('invitations.index'));

        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_view_the_invitations_page()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->get(route('invitations.index'));

        $response->assertOk();
    }

    public function test_an_invitation_can_be_created_and_gets_a_unique_code()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->post(route('invitations.store'), [
            'guest_name' => 'Familia Mendoza',
            'email' => 'mendoza@example.com',
            'max_passes' => 4,
        ]);

        $response->assertRedirect(route('invitations.index'));

        $invitation = Invitation::sole();
        $this->assertSame('Familia Mendoza', $invitation->guest_name);
        $this->assertSame(4, $invitation->max_passes);
        $this->assertSame(10, strlen($invitation->code));
        $this->assertNull($invitation->attending);
    }

    public function test_an_invitation_can_be_created_without_an_email()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->post(route('invitations.store'), [
            'guest_name' => 'Tia Rosa',
            'email' => '',
            'max_passes' => 1,
        ]);

        $response->assertRedirect(route('invitations.index'));
        $this->assertNull(Invitation::sole()->email);
    }

    public function test_an_invitation_can_be_updated()
    {
        $this->actingAs(User::factory()->create());
        $invitation = Invitation::factory()->create(['guest_name' => 'Familia Perez', 'max_passes' => 2]);

        $response = $this->put(route('invitations.update', $invitation), [
            'guest_name' => 'Familia Perez Lopez',
            'email' => 'perez@example.com',
            'max_passes' => 3,
        ]);

        $response->assertRedirect(route('invitations.index'));

        $invitation->refresh();
        $this->assertSame('Familia Perez Lopez', $invitation->guest_name);
        $this->assertSame('perez@example.com', $invitation->email);
        $this->assertSame(3, $invitation->max_passes);
    }

    public function test_max_passes_cannot_go_below_the_confirmed_passes()
    {
        $this->actingAs(User::factory()->create());
        $invitation = Invitation::factory()->responded()->create();

        $response = $this->put(route('invitations.update', $invitation), [
            'guest_name' => $invitation->guest_name,
            'email' => $invitation->email,
            'max_passes' => 1,
        ]);

        $response->assertSessionHasErrors(['max_passes']);
    }

    public function test_an_invitation_can_be_deleted()
    {
        $this->actingAs(User::factory()->create());
        $invitation = Invitation::factory()->create();

        $response = $this->delete(route('invitations.destroy', $invitation));

        $response->assertRedirect(route('invitations.index'));
        $this->assertDatabaseMissing('invitations', ['id' => $invitation->id]);
    }

    public function test_sending_an_invitation_queues_the_email_and_stamps_sent_at()
    {
        Mail::fake();
        $this->actingAs(User::factory()->create());
        $invitation = Invitation::factory()->create(['email' => 'mendoza@example.com']);

        $response = $this->post(route('invitations.send', $invitation));

        $response->assertRedirect(route('invitations.index'));
        Mail::assertQueued(InvitationMail::class, fn (InvitationMail $mail) => $mail->hasTo('mendoza@example.com'));
        $this->assertNotNull($invitation->refresh()->sent_at);
    }

    public function test_sending_requires_an_email_address()
    {
        Mail::fake();
        $this->actingAs(User::factory()->create());
        $invitation = Invitation::factory()->create(['email' => null]);

        $response = $this->post(route('invitations.send', $invitation));

        $response->assertRedirect(route('invitations.index'));
        Mail::assertNothingQueued();
        $this->assertNull($invitation->refresh()->sent_at);
    }

    public function test_the_lock_can_be_toggled()
    {
        $this->actingAs(User::factory()->create());
        $invitation = Invitation::factory()->create();

        $this->put(route('invitations.lock', $invitation));
        $this->assertTrue($invitation->refresh()->is_locked);

        $this->put(route('invitations.lock', $invitation));
        $this->assertFalse($invitation->refresh()->is_locked);
    }
}
