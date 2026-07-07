<?php

use App\Http\Controllers\Dashboard\TimelineItemController;
use App\Http\Controllers\Dashboard\WeddingSettingController;
use App\Http\Controllers\InvitationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [InvitationController::class, 'home'])->name('home');
Route::get('historia', [InvitationController::class, 'story'])->name('invitation.story');
Route::get('asistencia', [InvitationController::class, 'rsvp'])->name('invitation.rsvp');
Route::get('detalles', [InvitationController::class, 'details'])->name('invitation.details');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('dashboard/wedding', [WeddingSettingController::class, 'edit'])->name('wedding.edit');
    Route::put('dashboard/wedding', [WeddingSettingController::class, 'update'])->name('wedding.update');

    Route::get('dashboard/timeline', [TimelineItemController::class, 'index'])->name('timeline.index');
    Route::post('dashboard/timeline', [TimelineItemController::class, 'store'])->name('timeline.store');
    Route::put('dashboard/timeline/{timelineItem}', [TimelineItemController::class, 'update'])->name('timeline.update');
    Route::delete('dashboard/timeline/{timelineItem}', [TimelineItemController::class, 'destroy'])->name('timeline.destroy');
});

require __DIR__.'/settings.php';
