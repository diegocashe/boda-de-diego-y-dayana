<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\HomeContentUpdateRequest;
use App\Models\WeddingSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class HomeContentController extends Controller
{
    /**
     * Show the homepage content form.
     */
    public function edit(): Response
    {
        $wedding = WeddingSetting::current();

        return Inertia::render('dashboard/home-content', [
            'content' => [
                'heroEyebrow' => $wedding->hero_eyebrow,
                'heroScrollHint' => $wedding->hero_scroll_hint,
                'countdownEyebrow' => $wedding->countdown_eyebrow,
                'countdownHeading' => $wedding->countdown_heading,
                'ctaHeading' => $wedding->cta_heading,
                'ctaParagraph' => $wedding->cta_paragraph,
                'ctaButtonLabel' => $wedding->cta_button_label,
            ],
        ]);
    }

    /**
     * Update the homepage content.
     */
    public function update(HomeContentUpdateRequest $request): RedirectResponse
    {
        WeddingSetting::current()->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Textos de la página de inicio actualizados.']);

        return to_route('home-content.edit');
    }
}
