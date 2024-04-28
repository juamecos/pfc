<?php

namespace Database\Factories;

use App\Models\Found;
use App\Models\Stone;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory for creating instances of Found model.
 */
class FoundFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Found::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'stone_id' => Stone::factory(), // Automatically handle Stone creation
            'user_id' => User::factory(),  // Automatically handle User creation
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
            'country' => $this->faker->country,
            'city' => $this->faker->city,
        ];
    }
}
