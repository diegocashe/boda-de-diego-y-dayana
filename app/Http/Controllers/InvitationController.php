<?php

namespace App\Http\Controllers;

use App\Models\WeddingSetting;
use Inertia\Inertia;
use Inertia\Response;

class InvitationController extends Controller
{
    /**
     * Show the public wedding invitation.
     */
    public function show(): Response
    {
        $wedding = WeddingSetting::current();

        return Inertia::render('invitation', [
            'wedding' => [
                'groomName' => $wedding->groom_name,
                'brideName' => $wedding->bride_name,
                'weddingAt' => $wedding->wedding_at->toIso8601String(),
                'city' => $wedding->city,
            ],
            // Invitado de demostración; vendrá de la tabla de invitados en futuras versiones.
            'guest' => [
                'name' => 'Familia Mendoza',
                'maxPasses' => 4,
                'videoUrl' => null,
                'videoMessage' => 'Grabamos este video con todo nuestro cariño para invitarte de manera especial. ¡Esperamos verte para celebrar juntos!',
            ],
        ]);
    }
}
