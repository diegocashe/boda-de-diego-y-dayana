<?php

namespace Tests\Feature\Dashboard;

use App\Models\TimelineItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class TimelineItemsTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('timeline.index'));

        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_view_the_timeline_admin_page()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->get(route('timeline.index'));

        $response->assertOk();
    }

    public function test_a_timeline_item_can_be_created_with_an_image()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $response = $this->post(route('timeline.store'), [
            'period' => '2019',
            'title' => 'Como nos conocimos',
            'description' => 'Una tarde de cafe que se volvio el comienzo de todo.',
            'icon' => 'coffee',
            'highlighted' => '1',
            'sort_order' => 1,
            'image' => UploadedFile::fake()->image('momento.jpg'),
        ]);

        $response->assertRedirect(route('timeline.index'));

        $item = TimelineItem::sole();
        $this->assertSame('Como nos conocimos', $item->title);
        $this->assertTrue($item->highlighted);
        $this->assertNotNull($item->image_path);
        Storage::disk('public')->assertExists($item->image_path);
    }

    public function test_updating_with_a_new_image_replaces_the_old_one()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $oldPath = UploadedFile::fake()->image('vieja.jpg')->store('timeline', 'public');
        $item = TimelineItem::create([
            'period' => '2021',
            'title' => 'Primer viaje',
            'description' => 'Descripcion original.',
            'icon' => 'plane',
            'highlighted' => true,
            'sort_order' => 2,
            'image_path' => $oldPath,
        ]);

        $response = $this->put(route('timeline.update', $item), [
            'period' => 'Verano 2021',
            'title' => 'Nuestro primer viaje',
            'description' => 'Descripcion actualizada.',
            'icon' => 'map-pin',
            'sort_order' => 5,
            'image' => UploadedFile::fake()->image('nueva.jpg'),
        ]);

        $response->assertRedirect(route('timeline.index'));

        $item->refresh();
        $this->assertSame('Nuestro primer viaje', $item->title);
        $this->assertSame('map-pin', $item->icon);
        $this->assertFalse($item->highlighted, 'Un checkbox desmarcado debe persistir como false.');
        $this->assertNotSame($oldPath, $item->image_path);
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($item->image_path);
    }

    public function test_deleting_an_item_removes_its_image()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $path = UploadedFile::fake()->image('momento.jpg')->store('timeline', 'public');
        $item = TimelineItem::create([
            'period' => '2023',
            'title' => 'Nuestro primer hogar',
            'description' => 'Cajas y plantas nuevas.',
            'icon' => 'home',
            'sort_order' => 3,
            'image_path' => $path,
        ]);

        $response = $this->delete(route('timeline.destroy', $item));

        $response->assertRedirect(route('timeline.index'));
        $this->assertDatabaseMissing('timeline_items', ['id' => $item->id]);
        Storage::disk('public')->assertMissing($path);
    }

    public function test_the_icon_must_belong_to_the_allowed_set()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->post(route('timeline.store'), [
            'period' => '2019',
            'title' => 'Momento',
            'description' => 'Descripcion.',
            'icon' => 'rocket',
            'sort_order' => 1,
        ]);

        $response->assertSessionHasErrors(['icon']);
    }

    public function test_the_public_story_page_shows_the_stored_milestones()
    {
        TimelineItem::create([
            'period' => '2019',
            'title' => 'Nuestro primer capitulo',
            'description' => 'El comienzo de todo.',
            'icon' => 'coffee',
            'sort_order' => 1,
        ]);

        $response = $this->get(route('invitation.story'));

        $response->assertOk();
        $response->assertSee('Nuestro primer capitulo');
    }
}
