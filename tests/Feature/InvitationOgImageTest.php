<?php

namespace Tests\Feature;

use App\Models\Invitation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InvitationOgImageTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_og_image_route_generates_and_caches_a_jpeg()
    {
        Storage::fake('public');

        $invitation = Invitation::factory()->create(['guest_name' => 'Familia Mendoza']);

        $response = $this->get(route('invitation.og-image', $invitation));

        $response->assertOk();
        $response->assertHeader('Content-Type', 'image/jpeg');
        Storage::disk('public')->assertExists("og/{$invitation->code}.jpg");
    }
}
