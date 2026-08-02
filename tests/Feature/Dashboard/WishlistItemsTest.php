<?php

namespace Tests\Feature\Dashboard;

use App\Models\User;
use App\Models\WishlistItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class WishlistItemsTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('wishlist.index'));

        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_view_the_wishlist_admin_page()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->get(route('wishlist.index'));

        $response->assertOk();
    }

    public function test_a_wishlist_item_can_be_created_with_an_image()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $response = $this->post(route('wishlist.store'), [
            'title' => 'Vajilla de porcelana',
            'description' => '4 piezas para el dia a dia, en tono crudo con borde dorado.',
            'image' => UploadedFile::fake()->image('vajilla.jpg'),
        ]);

        $response->assertRedirect(route('wishlist.index'));

        $item = WishlistItem::sole();
        $this->assertSame('Vajilla de porcelana', $item->title);
        $this->assertSame('available', $item->status);
        $this->assertNotNull($item->image_path);
        $this->assertStringEndsWith('.webp', $item->image_path);
        $this->assertIsInt($item->image_width);
        $this->assertIsInt($item->image_height);
        Storage::disk('public')->assertExists($item->image_path);
    }

    public function test_creating_a_wishlist_item_requires_an_image()
    {
        $this->actingAs(User::factory()->create());

        $response = $this->post(route('wishlist.store'), [
            'title' => 'Batidora de pie',
            'description' => 'Para nuestros experimentos de reposteria de fin de semana.',
        ]);

        $response->assertSessionHasErrors('image');
    }

    public function test_updating_with_a_new_image_replaces_the_old_one()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $oldPath = UploadedFile::fake()->image('vieja.jpg')->store('wishlist', 'public');
        $item = WishlistItem::create([
            'title' => 'Cafetera espresso',
            'description' => 'Descripcion original.',
            'status' => 'available',
            'sort_order' => 1,
            'image_path' => $oldPath,
        ]);

        $response = $this->put(route('wishlist.update', $item), [
            'title' => 'Cafetera espresso italiana',
            'description' => 'Descripcion actualizada.',
            'status' => 'available',
            'image' => UploadedFile::fake()->image('nueva.jpg'),
        ]);

        $response->assertRedirect(route('wishlist.index'));

        $item->refresh();
        $this->assertSame('Cafetera espresso italiana', $item->title);
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($item->image_path);
    }

    public function test_updating_the_status_without_a_new_image_keeps_the_existing_image()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $path = UploadedFile::fake()->image('actual.jpg')->store('wishlist', 'public');
        $item = WishlistItem::create([
            'title' => 'Juego de sabanas',
            'description' => 'Algodon egipcio 400 hilos, tamano king, color arena.',
            'status' => 'reserved',
            'sort_order' => 1,
            'image_path' => $path,
        ]);

        $response = $this->put(route('wishlist.update', $item), [
            'title' => $item->title,
            'description' => $item->description,
            'status' => 'available',
        ]);

        $response->assertRedirect(route('wishlist.index'));

        $item->refresh();
        $this->assertSame('available', $item->status);
        $this->assertSame($path, $item->image_path);
        Storage::disk('public')->assertExists($path);
    }

    public function test_destroying_a_wishlist_item_removes_its_image()
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());

        $path = UploadedFile::fake()->image('borrar.jpg')->store('wishlist', 'public');
        $item = WishlistItem::create([
            'title' => 'Fondo para casa nueva',
            'description' => 'Un empujon para amueblar los ultimos rincones de nuestro hogar.',
            'status' => 'available',
            'sort_order' => 1,
            'image_path' => $path,
        ]);

        $response = $this->delete(route('wishlist.destroy', $item));

        $response->assertRedirect(route('wishlist.index'));
        $this->assertDatabaseMissing('wishlist_items', ['id' => $item->id]);
        Storage::disk('public')->assertMissing($path);
    }

    public function test_wishlist_items_can_be_reordered()
    {
        $this->actingAs(User::factory()->create());

        $first = WishlistItem::create([
            'title' => 'Vajilla de porcelana',
            'description' => '4 piezas para el dia a dia, en tono crudo con borde dorado.',
            'status' => 'available',
            'sort_order' => 0,
        ]);
        $second = WishlistItem::create([
            'title' => 'Batidora de pie',
            'description' => 'Para nuestros experimentos de reposteria de fin de semana.',
            'status' => 'available',
            'sort_order' => 1,
        ]);

        $response = $this->patch(route('wishlist.reorder'), [
            'ids' => [$second->id, $first->id],
        ]);

        $response->assertRedirect();
        $this->assertSame(0, $second->refresh()->sort_order);
        $this->assertSame(1, $first->refresh()->sort_order);
    }
}
