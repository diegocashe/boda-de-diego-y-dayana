<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\WeddingSetting;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the KPI overview for wedding invitations.
     */
    public function index(): Response
    {
        $invitations = Invitation::query()->get([
            'max_passes', 'confirmed_passes', 'attending', 'sent_at', 'dietary',
        ]);

        $total = $invitations->count();
        $sent = $invitations->whereNotNull('sent_at')->count();
        $confirmed = $invitations->where('attending', true);
        $declined = $invitations->where('attending', false);
        $pending = $invitations->whereNull('attending');
        $responded = $confirmed->count() + $declined->count();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalInvitations' => $total,
                'sentInvitations' => $sent,
                'expectedGuests' => (int) $invitations->sum('max_passes'),
                'confirmedInvitations' => $confirmed->count(),
                'confirmedGuests' => (int) $confirmed->sum('confirmed_passes'),
                'pendingInvitations' => $pending->count(),
                'declinedInvitations' => $declined->count(),
                'dietaryRestrictions' => $invitations->whereNotNull('dietary')->where('dietary', '!=', '')->count(),
                'responseRate' => $sent > 0 ? round(($responded / $sent) * 100) : 0,
                'daysUntilWedding' => (int) now()->diffInDays(WeddingSetting::current()->wedding_at, false),
            ],
        ]);
    }
}
