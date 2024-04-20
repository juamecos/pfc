<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Stone;
use App\Models\User;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Like>
 */
class LikeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // The default state of the model
            'stone_id' => Stone::inRandomOrder()->firstOrFail()->id,
            'user_id' => User::inRandomOrder()->firstOrFail()->id,
        ];
    }
}
