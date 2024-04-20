<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Stone;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Found>
 */
class FoundFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed> The array of default values for a new Found instance.
     */
    public function definition(): array
    {
        $latitude = $this->faker->latitude($min = -90, $max = 90);
        $longitude = $this->faker->longitude($min = -180, $max = 180);

        return [
            'stone_id' => Stone::inRandomOrder()->firstOrFail()->id,  // Random stone ID from existing stones
            'user_id' => User::inRandomOrder()->firstOrFail()->id,    // Random user ID from existing users
            'latitude' => $latitude,
            'longitude' => $longitude,                  // Random longitude for the found location
            // 'location' are handled by model's boot method
        ];
    }
}
