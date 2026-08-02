<?php

namespace Tests\Feature;

use App\Models\WishlistItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicWishlistTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_wishlist_page_shows_the_stored_items()
    {
        $item = WishlistItem::create([
            'title' => 'Vajilla de porcelana',
            'description' => '4 piezas para el dia a dia, en tono crudo con borde dorado.',
            'status' => 'available',
            'sort_order' => 0,
        ]);

        $response = $this->get(route('invitation.wishlist'));

        $response->assertOk();
        $response->assertSee($item->title);
    }

    public function test_a_guest_can_reserve_an_available_item()
    {
        $item = WishlistItem::create([
            'title' => 'Cafetera espresso',
            'description' => 'Nuestro ritual de las mananas, ahora en casa nueva.',
            'status' => 'available',
            'sort_order' => 0,
        ]);

        $response = $this->from(route('invitation.wishlist'))->post(route('invitation.wishlist.reserve', $item));

        $response->assertRedirect(route('invitation.wishlist'));
        $this->assertSame('reserved', $item->refresh()->status);
    }

    public function test_reserving_an_already_reserved_item_is_a_no_op()
    {
        $item = WishlistItem::create([
            'title' => 'Juego de sabanas',
            'description' => 'Algodon egipcio 400 hilos, tamano king, color arena.',
            'status' => 'reserved',
            'sort_order' => 0,
        ]);

        $response = $this->from(route('invitation.wishlist'))->post(route('invitation.wishlist.reserve', $item));

        $response->assertRedirect(route('invitation.wishlist'));
        $this->assertSame('reserved', $item->refresh()->status);
    }

    public function test_reserving_an_unknown_item_returns_a_404()
    {
        $response = $this->post('/lista-de-deseos/999/reservar');

        $response->assertNotFound();
    }
}
