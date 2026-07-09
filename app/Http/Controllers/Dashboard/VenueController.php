<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\VenueStoreRequest;
use App\Http\Requests\Dashboard\VenueUpdateRequest;
use App\Models\Venue;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class VenueController extends Controller
{
    /**
     * List the venues for management.
     */
    public function index(): Response
    {
        return Inertia::render('dashboard/venues', [
            'venues' => Venue::query()->ordered()->get()->map(fn (Venue $venue): array => [
                'id' => $venue->id,
                'label' => $venue->label,
                'name' => $venue->name,
                'schedule' => $venue->schedule,
                'lat' => $venue->lat,
                'lng' => $venue->lng,
                'icon' => $venue->icon,
                'accent' => $venue->accent,
                'sortOrder' => $venue->sort_order,
            ]),
            'icons' => Venue::ICONS,
            'accents' => Venue::ACCENTS,
        ]);
    }

    /**
     * Create a venue.
     */
    public function store(VenueStoreRequest $request): RedirectResponse
    {
        Venue::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Ubicación agregada.']);

        return to_route('venues.index');
    }

    /**
     * Update a venue.
     */
    public function update(VenueUpdateRequest $request, Venue $venue): RedirectResponse
    {
        $venue->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Ubicación actualizada.']);

        return to_route('venues.index');
    }

    /**
     * Delete a venue.
     */
    public function destroy(Venue $venue): RedirectResponse
    {
        $venue->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Ubicación eliminada.']);

        return to_route('venues.index');
    }
}
