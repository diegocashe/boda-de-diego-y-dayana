<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\WeddingSettingUpdateRequest;
use App\Models\WeddingSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class WeddingSettingController extends Controller
{
    /**
     * Show the wedding settings form.
     */
    public function edit(): Response
    {
        $wedding = WeddingSetting::current();

        return Inertia::render('dashboard/wedding', [
            'wedding' => [
                'groomName' => $wedding->groom_name,
                'brideName' => $wedding->bride_name,
                'weddingAtLocal' => $wedding->wedding_at->format('Y-m-d\TH:i'),
                'city' => $wedding->city,
            ],
        ]);
    }

    /**
     * Update the wedding settings.
     */
    public function update(WeddingSettingUpdateRequest $request): RedirectResponse
    {
        WeddingSetting::current()->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Datos de la boda actualizados.']);

        return to_route('wedding.edit');
    }
}
