<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Usuario administrador único; re-seedear actualiza nombre/contraseña.
        User::firstOrNew(['email' => 'admin@diegoydayana.com'])->forceFill([
            'name' => 'Diego y Dayana',
            'password' => config('app.admin_seed_password'),
            'email_verified_at' => now(),
        ])->save();
    }
}
