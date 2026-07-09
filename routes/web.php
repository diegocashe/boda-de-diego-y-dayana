<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\GiftRegistryEntryController;
use App\Http\Controllers\Dashboard\HomeContentController;
use App\Http\Controllers\Dashboard\InvitationController as DashboardInvitationController;
use App\Http\Controllers\Dashboard\TimelineItemController;
use App\Http\Controllers\Dashboard\VenueController;
use App\Http\Controllers\Dashboard\WeddingSettingController;
use App\Http\Controllers\InvitationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [InvitationController::class, 'home'])->name('home');
Route::get('historia', [InvitationController::class, 'story'])->name('invitation.story');
Route::get('asistencia', [InvitationController::class, 'rsvp'])->name('invitation.rsvp');
Route::get('asistencia/{invitation:code}', [InvitationController::class, 'rsvpShow'])->name('invitation.rsvp.show');
Route::post('asistencia/{invitation:code}', [InvitationController::class, 'rsvpStore'])->name('invitation.rsvp.store');
Route::get('asistencia/{invitation:code}/og.jpg', [InvitationController::class, 'ogImage'])->name('invitation.og-image');
Route::get('detalles', [InvitationController::class, 'details'])->name('invitation.details');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('dashboard/wedding', [WeddingSettingController::class, 'edit'])->name('wedding.edit');
    Route::put('dashboard/wedding', [WeddingSettingController::class, 'update'])->name('wedding.update');

    Route::get('dashboard/home-content', [HomeContentController::class, 'edit'])->name('home-content.edit');
    Route::put('dashboard/home-content', [HomeContentController::class, 'update'])->name('home-content.update');

    Route::get('dashboard/timeline', [TimelineItemController::class, 'index'])->name('timeline.index');
    Route::post('dashboard/timeline', [TimelineItemController::class, 'store'])->name('timeline.store');
    Route::put('dashboard/timeline/{timelineItem}', [TimelineItemController::class, 'update'])->name('timeline.update');
    Route::delete('dashboard/timeline/{timelineItem}', [TimelineItemController::class, 'destroy'])->name('timeline.destroy');

    Route::get('dashboard/invitations', [DashboardInvitationController::class, 'index'])->name('invitations.index');
    Route::get('dashboard/invitations/export', [DashboardInvitationController::class, 'export'])->name('invitations.export');
    Route::post('dashboard/invitations', [DashboardInvitationController::class, 'store'])->name('invitations.store');
    Route::put('dashboard/invitations/{invitation}', [DashboardInvitationController::class, 'update'])->name('invitations.update');
    Route::delete('dashboard/invitations/{invitation}', [DashboardInvitationController::class, 'destroy'])->name('invitations.destroy');
    Route::post('dashboard/invitations/{invitation}/send', [DashboardInvitationController::class, 'send'])->name('invitations.send');
    Route::put('dashboard/invitations/{invitation}/lock', [DashboardInvitationController::class, 'toggleLock'])->name('invitations.lock');
    Route::post('dashboard/invitations/{invitation}/og-regenerate', [DashboardInvitationController::class, 'regenerateOgImage'])->name('invitations.og-regenerate');

    Route::get('dashboard/venues', [VenueController::class, 'index'])->name('venues.index');
    Route::post('dashboard/venues', [VenueController::class, 'store'])->name('venues.store');
    Route::put('dashboard/venues/{venue}', [VenueController::class, 'update'])->name('venues.update');
    Route::delete('dashboard/venues/{venue}', [VenueController::class, 'destroy'])->name('venues.destroy');

    Route::get('dashboard/gift-registry', [GiftRegistryEntryController::class, 'index'])->name('gift-registry.index');
    Route::post('dashboard/gift-registry', [GiftRegistryEntryController::class, 'store'])->name('gift-registry.store');
    Route::put('dashboard/gift-registry/{giftRegistryEntry}', [GiftRegistryEntryController::class, 'update'])->name('gift-registry.update');
    Route::delete('dashboard/gift-registry/{giftRegistryEntry}', [GiftRegistryEntryController::class, 'destroy'])->name('gift-registry.destroy');
});

require __DIR__.'/settings.php';
