<?php

namespace Database\Seeders;

use App\Models\Invitation;
use Illuminate\Database\Seeder;

/**
 * Invitados de "Boda - Invitados.csv". Filas que claramente son la misma
 * invitación (parejas explícitas: "novio/a de", "esposa/o de", "pareja de",
 * "acompañante de") se agrupan en un solo registro con max_passes = 2.
 */
class InvitationSeeder extends Seeder
{
    /**
     * Seed the invitations table.
     */
    public function run(): void
    {
        $invitations = [
            ['guest_name' => 'Orietta Hernandez', 'relationship' => 'mama del novio'],
            ['guest_name' => 'Alejandra Castillo', 'relationship' => 'hermana del novio'],
            ['guest_name' => 'Freddy Castillo', 'relationship' => 'papa del novio'],
            ['guest_name' => 'Jonnathan Cardenas', 'relationship' => 'amigo de Orietta'],
            ['guest_name' => 'Yanira', 'relationship' => 'amiga de Orietta'],
            ['guest_name' => 'Magalys', 'relationship' => 'amiga de Orietta'],
            ['guest_name' => 'Pelon', 'relationship' => 'amigo de Orietta'],
            ['guest_name' => 'Katy', 'relationship' => 'amiga de Orietta'],
            ['guest_name' => 'Wilson Gonzalez', 'relationship' => 'papa de la novia', 'table_number' => 1],
            ['guest_name' => 'Lisbeth Auvert', 'relationship' => 'mama de la novia', 'table_number' => 1],
            ['guest_name' => 'Cindy Gonzalez', 'relationship' => 'hermana de la novia', 'table_number' => 1],
            ['guest_name' => 'Luna Castellano', 'relationship' => 'amiga de Cindy', 'table_number' => 1],
            ['guest_name' => 'Ricardo de la Vega y acompañante', 'relationship' => 'amigo del novio', 'max_passes' => 2],
            ['guest_name' => 'Toro', 'relationship' => 'hermana del novio'],
            ['guest_name' => 'Fabiana Peralta y Bernardo', 'relationship' => 'amiga de la novia y su novio', 'table_number' => 3, 'max_passes' => 2],
            ['guest_name' => 'Laura Urdaneta y Yoelvis', 'relationship' => 'amiga de la novia y su novio', 'table_number' => 3, 'max_passes' => 2],
            ['guest_name' => 'Ana Bass', 'relationship' => 'amiga del novio'],
            ['guest_name' => 'Genesis Gocha', 'relationship' => 'amiga del novio'],
            ['guest_name' => 'Andrea Perozo', 'relationship' => 'amiga de la novia', 'table_number' => 3],
            ['guest_name' => 'Edgar Agarra', 'relationship' => 'amigo de la novia', 'table_number' => 3],
            ['guest_name' => 'Ocarina Hernandez', 'relationship' => 'tia del novio'],
            ['guest_name' => 'Señor Viloria', 'relationship' => 'tio del novio'],
            ['guest_name' => 'Juan Diego Viloria', 'relationship' => 'primo del novio'],
            ['guest_name' => 'Valeria Viloria', 'relationship' => 'prima del novio'],
            ['guest_name' => 'Señora Vestalia', 'relationship' => 'abuela del novio'],
            ['guest_name' => 'Georgina Guarecuco', 'relationship' => 'prima de la novia', 'table_number' => 1],
            ['guest_name' => 'Ale Guarecuco', 'relationship' => 'amigo de Wilson', 'table_number' => 1],
            ['guest_name' => 'El negro Inciarte', 'relationship' => 'amigo de Wilson', 'table_number' => 1],
            ['guest_name' => 'Maritza Inciarte', 'relationship' => 'prima de la novia', 'table_number' => 1],
            ['guest_name' => 'Yamel González', 'relationship' => 'tia de la novia', 'table_number' => 1],
            ['guest_name' => 'Elfida Auvert y Jose Luis', 'relationship' => 'tia de la novia y su pareja', 'table_number' => 2, 'max_passes' => 2],
            ['guest_name' => 'Diego Rubio', 'relationship' => 'primo de Dayana', 'table_number' => 2],
            ['guest_name' => 'Juan Camilo Rubio', 'relationship' => 'primo de Dayana', 'table_number' => 2],
            ['guest_name' => 'Jose Luis Castillo y Tania', 'relationship' => 'tio del novio y su esposa', 'max_passes' => 2],
            ['guest_name' => 'Isabel Rondon', 'relationship' => 'tia de la novia', 'table_number' => 2],
            ['guest_name' => 'Tico Cabrera', 'relationship' => 'tio de la novia', 'table_number' => 2],
            ['guest_name' => 'Daniela Cabrera', 'relationship' => 'prima de la novia', 'table_number' => 2],
            ['guest_name' => 'Daliana Cabrera', 'relationship' => 'prima de la novia', 'table_number' => 2],
            ['guest_name' => 'David y Paola Andrade', 'relationship' => 'amigo del novio y su esposa', 'max_passes' => 2],
            ['guest_name' => 'Jhoyser', 'relationship' => 'amigo del novio'],
            ['guest_name' => 'Oscar', 'relationship' => 'amigo del novio'],
            ['guest_name' => 'Samuel', 'relationship' => 'amigo del novio'],
            ['guest_name' => 'Valeria Perez', 'relationship' => 'amiga de la novia'],
            ['guest_name' => 'Andrés Villasmil', 'relationship' => 'amiga de la novia'],
            ['guest_name' => 'Lismar', 'relationship' => 'amiga de la novia', 'table_number' => 3],
            ['guest_name' => 'Angeluz', 'relationship' => 'amiga de la novia', 'table_number' => 3],
            ['guest_name' => 'Jose Andres', 'relationship' => 'amigo del novio'],
            ['guest_name' => 'Eduardo y esposa', 'relationship' => 'amigo del novio y su esposa', 'max_passes' => 2],
            ['guest_name' => 'Valentina Villabolos', 'relationship' => 'amiga de la novia', 'table_number' => 3],
        ];

        foreach ($invitations as $invitation) {
            Invitation::firstOrCreate(
                ['guest_name' => $invitation['guest_name']],
                [
                    'relationship' => $invitation['relationship'],
                    'table_number' => $invitation['table_number'] ?? null,
                    'max_passes' => $invitation['max_passes'] ?? 1,
                    // WithoutModelEvents en DatabaseSeeder desactiva el listener
                    // "creating" del modelo que normalmente genera el code.
                    'code' => Invitation::generateCode(),
                ],
            );
        }
    }
}
