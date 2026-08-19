<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\GuestUpload;
use App\Models\Invitation;
use Inertia\Inertia;
use Inertia\Response;

class GuestUploadController extends Controller
{
    /**
     * List every photo/video guests uploaded, plus each invitation's personal upload link.
     */
    public function index(): Response
    {
        return Inertia::render('dashboard/guest-uploads', [
            'uploads' => GuestUpload::query()->with('invitation')->latest()->get()->map(fn (GuestUpload $upload): array => [
                'id' => $upload->id,
                'type' => $upload->type,
                'url' => $upload->url,
                'originalFilename' => $upload->original_filename,
                'createdAt' => $upload->created_at->toIso8601String(),
                'invitationId' => $upload->invitation_id,
                'guestName' => $upload->invitation->guest_name,
            ]),
            'invitations' => Invitation::query()->withCount('uploads')->orderBy('guest_name')->get()->map(fn (Invitation $invitation): array => [
                'id' => $invitation->id,
                'guestName' => $invitation->guest_name,
                'code' => $invitation->code,
                'uploadLink' => route('invitation.uploads.show', $invitation),
                'uploadsCount' => $invitation->uploads_count,
            ]),
        ]);
    }
}
