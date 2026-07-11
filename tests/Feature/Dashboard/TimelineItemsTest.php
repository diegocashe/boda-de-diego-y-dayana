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
            'image' => UploadedFile::fake()->image('momento.jpg'),
        ]);

        $response->assertRedirect(route('timeline.index'));

        $item = TimelineItem::sole();
        $this->assertSame('Como nos conocimos', $item->title);
        $this->assertTrue($item->highlighted);
        $this->assertNotNull($item->image_path);
        $this->assertStringEndsWith('.webp', $item->image_path);
        $this->assertIsInt($item->image_width);
        $this->assertIsInt($item->image_height);
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
            'image' => UploadedFile::fake()->image('nueva.jpg'),
        ]);

        $response->assertRedirect(route('timeline.index'));

        $item->refresh();
        $this->assertSame('Nuestro primer viaje', $item->title);
        $this->assertSame('map-pin', $item->icon);
        $this->assertFalse($item->highlighted, 'Un checkbox desmarcado debe persistir como false.');
        $this->assertNotSame($oldPath, $item->image_path);
        $this->assertIsInt($item->image_width);
        $this->assertIsInt($item->image_height);
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

    public function test_a_timeline_item_can_be_created_with_a_video_and_poster()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $response = $this->post(route('timeline.store'), [
            'period' => '2020',
            'title' => 'La pedida',
            'description' => 'El momento en que todo cambio.',
            'icon' => 'gem',
            'video' => UploadedFile::fake()->create('momento.mp4', 100, 'video/mp4'),
            'video_poster' => UploadedFile::fake()->image('portada.jpg'),
        ]);

        $response->assertRedirect(route('timeline.index'));

        $item = TimelineItem::sole();
        $this->assertNull($item->image_path);
        $this->assertNotNull($item->video_path);
        $this->assertNotNull($item->video_poster_path);
        Storage::disk('public')->assertExists($item->video_path);
        Storage::disk('public')->assertExists($item->video_poster_path);
    }

    public function test_image_and_video_are_mutually_exclusive_on_create()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $response = $this->post(route('timeline.store'), [
            'period' => '2020',
            'title' => 'La pedida',
            'description' => 'El momento en que todo cambio.',
            'icon' => 'gem',
            'image' => UploadedFile::fake()->image('momento.jpg'),
            'video' => UploadedFile::fake()->create('momento.mp4', 100, 'video/mp4'),
        ]);

        $response->assertSessionHasErrors(['image', 'video']);
    }

    public function test_video_poster_is_rejected_without_a_video()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $response = $this->post(route('timeline.store'), [
            'period' => '2020',
            'title' => 'La pedida',
            'description' => 'El momento en que todo cambio.',
            'icon' => 'gem',
            'video_poster' => UploadedFile::fake()->image('portada.jpg'),
        ]);

        $response->assertSessionHasErrors(['video_poster']);
    }

    public function test_updating_with_a_new_video_replaces_the_old_image()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $oldImagePath = UploadedFile::fake()->image('vieja.jpg')->store('timeline', 'public');
        $item = TimelineItem::create([
            'period' => '2021',
            'title' => 'Primer viaje',
            'description' => 'Descripcion original.',
            'icon' => 'plane',
            'sort_order' => 2,
            'image_path' => $oldImagePath,
        ]);

        $response = $this->put(route('timeline.update', $item), [
            'period' => 'Verano 2021',
            'title' => 'Nuestro primer viaje',
            'description' => 'Descripcion actualizada.',
            'icon' => 'map-pin',
            'video' => UploadedFile::fake()->create('nuevo.mp4', 100, 'video/mp4'),
        ]);

        $response->assertRedirect(route('timeline.index'));

        $item->refresh();
        $this->assertNull($item->image_path);
        $this->assertNotNull($item->video_path);
        Storage::disk('public')->assertMissing($oldImagePath);
        Storage::disk('public')->assertExists($item->video_path);
    }

    public function test_deleting_an_item_removes_its_video_and_poster()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $videoPath = UploadedFile::fake()->create('momento.mp4', 100, 'video/mp4')->store('timeline', 'public');
        $posterPath = UploadedFile::fake()->image('portada.jpg')->store('timeline', 'public');
        $item = TimelineItem::create([
            'period' => '2023',
            'title' => 'Nuestro primer hogar',
            'description' => 'Cajas y plantas nuevas.',
            'icon' => 'home',
            'sort_order' => 3,
            'video_path' => $videoPath,
            'video_poster_path' => $posterPath,
        ]);

        $response = $this->delete(route('timeline.destroy', $item));

        $response->assertRedirect(route('timeline.index'));
        $this->assertDatabaseMissing('timeline_items', ['id' => $item->id]);
        Storage::disk('public')->assertMissing($videoPath);
        Storage::disk('public')->assertMissing($posterPath);
    }

    public function test_the_icon_must_belong_to_the_allowed_set()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->post(route('timeline.store'), [
            'period' => '2019',
            'title' => 'Momento',
            'description' => 'Descripcion.',
            'icon' => 'rocket',
        ]);

        $response->assertSessionHasErrors(['icon']);
    }

    public function test_items_can_be_reordered_by_dragging()
    {
        $this->actingAs(User::factory()->create());

        $a = TimelineItem::create([
            'period' => '2019',
            'title' => 'Primero',
            'description' => 'Descripcion.',
            'icon' => 'coffee',
            'sort_order' => 0,
        ]);
        $b = TimelineItem::create([
            'period' => '2020',
            'title' => 'Segundo',
            'description' => 'Descripcion.',
            'icon' => 'plane',
            'sort_order' => 1,
        ]);
        $c = TimelineItem::create([
            'period' => '2021',
            'title' => 'Tercero',
            'description' => 'Descripcion.',
            'icon' => 'home',
            'sort_order' => 2,
        ]);

        $response = $this->patch(route('timeline.reorder'), [
            'ids' => [$c->id, $a->id, $b->id],
        ]);

        $response->assertRedirect();

        $this->assertSame(0, $c->refresh()->sort_order);
        $this->assertSame(1, $a->refresh()->sort_order);
        $this->assertSame(2, $b->refresh()->sort_order);
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

    public function test_optimizing_images_converts_existing_photos_to_webp()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $oldPath = UploadedFile::fake()->image('vieja.jpg')->store('timeline', 'public');
        $item = TimelineItem::create([
            'period' => '2019',
            'title' => 'Como nos conocimos',
            'description' => 'Una tarde de cafe.',
            'icon' => 'coffee',
            'sort_order' => 1,
            'image_path' => $oldPath,
        ]);

        $response = $this->post(route('images.optimize'));

        $response->assertRedirect();

        $item->refresh();
        $this->assertNotSame($oldPath, $item->image_path);
        $this->assertStringEndsWith('.webp', $item->image_path);
        Storage::disk('public')->assertExists($item->image_path);
        Storage::disk('public')->assertMissing($oldPath);
    }
}
