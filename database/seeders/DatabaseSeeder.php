<?php

namespace Database\Seeders;

use App\Models\TimelineItem;
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

        $this->seedTimeline();
    }

    /**
     * Hitos iniciales de la historia; re-seedear no pisa los cambios hechos
     * desde el dashboard porque busca por título.
     */
    private function seedTimeline(): void
    {
        $milestones = [
            [
                'period' => '2019',
                'title' => 'Cómo nos conocimos',
                'description' => 'Entre el vapor de dos cafés y una conversación que no queríamos que terminara, una tarde cualquiera se volvió el comienzo de todo.',
                'icon' => 'coffee',
                'sort_order' => 1,
            ],
            [
                'period' => 'Verano 2021',
                'title' => 'Nuestro primer viaje',
                'description' => 'Maletas ligeras y un mapa lleno de planes. Descubrimos que viajar juntos era, en realidad, viajar hacia el mismo lugar.',
                'icon' => 'plane',
                'sort_order' => 2,
            ],
            [
                'period' => '2023',
                'title' => 'Nuestro primer hogar',
                'description' => 'Cajas, plantas nuevas y un café por estrenar. Construimos un espacio donde todos los días se sienten como estar en casa.',
                'icon' => 'home',
                'sort_order' => 3,
            ],
            [
                'period' => 'Diciembre 2025',
                'title' => 'La propuesta',
                'description' => 'Bajo las luces de invierno, una rodilla en el suelo y un «sí» que nos trajo hasta aquí. Ahora queremos celebrarlo contigo.',
                'icon' => 'gem',
                'highlighted' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($milestones as $milestone) {
            TimelineItem::firstOrCreate(['title' => $milestone['title']], $milestone);
        }
    }
}
