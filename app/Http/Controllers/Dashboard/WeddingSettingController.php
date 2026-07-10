<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\WeddingSettingUpdateRequest;
use App\Models\WeddingSetting;
use App\Services\InvitationOgImageService;
use App\Services\UploadedImageProcessor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
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
                'ogBackgroundUrl' => $wedding->og_background_url,
                'notificationEmails' => implode("\n", $wedding->notification_emails ?? []),
                'godparentsWhatsapp' => $wedding->godparents_whatsapp,
                'godparentsPhone' => $wedding->godparents_phone,
                'onlineMeetingUrl' => $wedding->online_meeting_url,
            ],
        ]);
    }

    /**
     * Update the wedding settings, replacing the OG background photo when a new one is uploaded.
     */
    public function update(WeddingSettingUpdateRequest $request, InvitationOgImageService $ogImages, UploadedImageProcessor $images): RedirectResponse
    {
        $wedding = WeddingSetting::current();
        $data = $request->safe()->except('og_background');

        if ($file = $request->file('og_background')) {
            if ($wedding->og_background_path) {
                Storage::disk('public')->delete($wedding->og_background_path);
            }

            $data['og_background_path'] = $images->store($file, 'wedding');
            $ogImages->invalidateAll();
        }

        $wedding->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Datos de la boda actualizados.']);

        return to_route('wedding.edit');
    }
}
