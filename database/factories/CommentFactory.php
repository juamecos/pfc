<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Stone;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'stone_id' => Stone::inRandomOrder()->first()->id,  // Random stone
            'user_id' => User::inRandomOrder()->first()->id,  // Random user
            'content' => $this->faker->paragraph,
            'active' => true,
            'abuse' => false,
            'moderation_status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'report_count' => $this->faker->numberBetween(0, 10),
        ];
    }
}
