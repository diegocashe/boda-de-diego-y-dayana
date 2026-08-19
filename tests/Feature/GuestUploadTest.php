<?php

namespace Tests\Feature;

use App\Models\GuestUpload;
use App\Models\Invitation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class GuestUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_uploads_page_shows_the_guest_by_code()
    {
        $invitation = Invitation::factory()->create(['guest_name' => 'Familia Mendoza']);

        $response = $this->get(route('invitation.uploads.show', $invitation));

        $response->assertOk();
        $response->assertSee('Familia Mendoza');
    }

    public function test_an_invalid_code_returns_a_404()
    {
        $response = $this->get('/fotos/no-existe');

        $response->assertNotFound();
    }

    public function test_a_guest_can_upload_a_photo()
    {
        Storage::fake('public');

        $invitation = Invitation::factory()->create();
        $file = UploadedFile::fake()->image('foto.jpg');

        $response = $this->post(route('invitation.uploads.store', $invitation), ['file' => $file]);

        $response->assertCreated();

        $upload = GuestUpload::sole();
        $this->assertSame($invitation->id, $upload->invitation_id);
        $this->assertSame('image', $upload->type);
        $this->assertSame('foto.jpg', $upload->original_filename);
        Storage::disk('public')->assertExists($upload->path);
        $this->assertStringStartsWith("guest-uploads/{$invitation->code}/", $upload->path);
    }

    public function test_a_guest_can_upload_a_video()
    {
        Storage::fake('public');

        $invitation = Invitation::factory()->create();
        $file = UploadedFile::fake()->create('clip.mp4', 500, 'video/mp4');

        $response = $this->post(route('invitation.uploads.store', $invitation), ['file' => $file]);

        $response->assertCreated();
        $this->assertSame('video', GuestUpload::sole()->type);
    }

    public function test_an_unsupported_file_type_is_rejected()
    {
        Storage::fake('public');

        $invitation = Invitation::factory()->create();
        $file = UploadedFile::fake()->create('archivo.pdf', 100, 'application/pdf');

        $response = $this->post(route('invitation.uploads.store', $invitation), ['file' => $file]);

        $response->assertStatus(422);
        $this->assertSame(0, GuestUpload::count());
    }

    public function test_uploading_to_an_invalid_code_returns_a_404()
    {
        $response = $this->post('/fotos/no-existe', ['file' => UploadedFile::fake()->image('foto.jpg')]);

        $response->assertNotFound();
    }
}
