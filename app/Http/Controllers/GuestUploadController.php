<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\BuildsWeddingProps;
use App\Http\Requests\GuestUploadStoreRequest;
use App\Models\Invitation;
use App\Models\WeddingSetting;
use App\Services\GuestUploadService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class GuestUploadController extends Controller
{
    use BuildsWeddingProps;

    /**
     * Show the page where a guest can upload photos and videos from the wedding.
     */
    public function show(Invitation $invitation): Response
    {
        $wedding = WeddingSetting::current();

        return Inertia::render('invitation/uploads', [
            'wedding' => $this->weddingProps($wedding),
            'guest' => [
                'name' => $invitation->guest_name,
                'code' => $invitation->code,
            ],
        ])->withViewData([
            'meta' => [
                'title' => "Comparte tus fotos · {$wedding->bride_name} & {$wedding->groom_name}",
                'description' => "Sube las fotos y videos que tomaste en la boda de {$wedding->bride_name} y {$wedding->groom_name}.",
            ],
        ]);
    }

    /**
     * Save a single photo or video the guest uploaded from their device.
     */
    public function store(GuestUploadStoreRequest $request, Invitation $invitation, GuestUploadService $uploads): JsonResponse
    {
        $upload = $uploads->store($invitation, $request->file('file'));

        return response()->json(['id' => $upload->id], 201);
    }
}
