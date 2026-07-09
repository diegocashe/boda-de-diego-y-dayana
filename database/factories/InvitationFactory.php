<?php

namespace Database\Factories;

use App\Models\Invitation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Invitation>
 */
class InvitationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'guest_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'max_passes' => fake()->numberBetween(1, 6),
        ];
    }

    /**
     * Indicate that the guest confirmed their attendance.
     */
    public function responded(): static
    {
        return $this->state(fn (array $attributes) => [
            'attending' => true,
            'confirmed_passes' => 2,
            'max_passes' => 4,
            'responded_at' => now(),
        ]);
    }

    /**
     * Indicate that the guest declined the invitation.
     */
    public function declined(): static
    {
        return $this->state(fn (array $attributes) => [
            'attending' => false,
            'confirmed_passes' => null,
            'responded_at' => now(),
        ]);
    }

    /**
     * Indicate that the invitation no longer accepts response changes.
     */
    public function locked(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_locked' => true,
        ]);
    }

    /**
     * Indicate that the invitation email has been sent.
     */
    public function sent(): static
    {
        return $this->state(fn (array $attributes) => [
            'sent_at' => now(),
        ]);
    }
}
