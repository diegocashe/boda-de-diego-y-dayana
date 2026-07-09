<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\GiftRegistryEntryStoreRequest;
use App\Http\Requests\Dashboard\GiftRegistryEntryUpdateRequest;
use App\Models\GiftRegistryEntry;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GiftRegistryEntryController extends Controller
{
    /**
     * List the gift registry entries for management.
     */
    public function index(): Response
    {
        return Inertia::render('dashboard/gift-registry', [
            'entries' => GiftRegistryEntry::query()->ordered()->get()->map(fn (GiftRegistryEntry $entry): array => [
                'id' => $entry->id,
                'label' => $entry->label,
                'value' => $entry->value,
                'sortOrder' => $entry->sort_order,
            ]),
        ]);
    }

    /**
     * Create a gift registry entry.
     */
    public function store(GiftRegistryEntryStoreRequest $request): RedirectResponse
    {
        GiftRegistryEntry::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Dato de mesa de regalos agregado.']);

        return to_route('gift-registry.index');
    }

    /**
     * Update a gift registry entry.
     */
    public function update(GiftRegistryEntryUpdateRequest $request, GiftRegistryEntry $giftRegistryEntry): RedirectResponse
    {
        $giftRegistryEntry->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Dato de mesa de regalos actualizado.']);

        return to_route('gift-registry.index');
    }

    /**
     * Delete a gift registry entry.
     */
    public function destroy(GiftRegistryEntry $giftRegistryEntry): RedirectResponse
    {
        $giftRegistryEntry->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Dato de mesa de regalos eliminado.']);

        return to_route('gift-registry.index');
    }
}
