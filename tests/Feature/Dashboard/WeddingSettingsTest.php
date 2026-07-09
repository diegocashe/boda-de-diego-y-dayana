<?php

namespace Tests\Feature\Dashboard;

use App\Models\User;
use App\Models\WeddingSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WeddingSettingsTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('wedding.edit'));

        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_view_the_wedding_settings_page()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->get(route('wedding.edit'));

        $response->assertOk();
    }

    public function test_wedding_settings_can_be_updated()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->put(route('wedding.update'), [
            'groom_name' => 'Diego',
            'bride_name' => 'Dayana',
            'wedding_at' => '2026-10-17T18:30',
            'city' => 'Guadalajara',
        ]);

        $response->assertRedirect(route('wedding.edit'));

        $wedding = WeddingSetting::current();
        $this->assertSame('Guadalajara', $wedding->city);
        $this->assertSame('2026-10-17 18:30', $wedding->wedding_at->format('Y-m-d H:i'));
    }

    public function test_wedding_settings_require_valid_data()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->put(route('wedding.update'), [
            'groom_name' => '',
            'bride_name' => 'Dayana',
            'wedding_at' => 'no-es-una-fecha',
            'city' => 'Ciudad de México',
        ]);

        $response->assertSessionHasErrors(['groom_name', 'wedding_at']);
    }

    public function test_the_public_invitation_uses_the_stored_wedding_settings()
    {
        WeddingSetting::current()->update(['city' => 'Monterrey']);

        $response = $this->get(route('home'));

        $response->assertOk();
        $response->assertSee('Monterrey');
    }

    public function test_notification_emails_are_parsed_from_a_multiline_textarea()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->put(route('wedding.update'), [
            'groom_name' => 'Diego',
            'bride_name' => 'Dayana',
            'wedding_at' => '2026-10-17T18:30',
            'city' => 'Guadalajara',
            'notification_emails' => "pareja@correo.com\nmama@correo.com, papa@correo.com",
        ]);

        $response->assertRedirect(route('wedding.edit'));

        $this->assertSame(
            ['pareja@correo.com', 'mama@correo.com', 'papa@correo.com'],
            WeddingSetting::current()->notification_emails,
        );
    }

    public function test_invalid_notification_emails_are_rejected()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->put(route('wedding.update'), [
            'groom_name' => 'Diego',
            'bride_name' => 'Dayana',
            'wedding_at' => '2026-10-17T18:30',
            'city' => 'Guadalajara',
            'notification_emails' => 'no-es-un-correo',
        ]);

        $response->assertSessionHasErrors(['notification_emails.0']);
    }
}
