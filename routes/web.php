<?php

use App\Http\Controllers\Dashboard\WeddingSettingController;
use App\Http\Controllers\InvitationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [InvitationController::class, 'show'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('dashboard/wedding', [WeddingSettingController::class, 'edit'])->name('wedding.edit');
    Route::put('dashboard/wedding', [WeddingSettingController::class, 'update'])->name('wedding.update');
});

require __DIR__.'/settings.php';
