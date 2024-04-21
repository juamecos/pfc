<?php

namespace Database\Factories;

use App\Models\Stone;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class StoneFactory extends Factory
{
    protected $model = Stone::class;

    public function definition()
    {
        $latitude = $this->faker->latitude($min = -90, $max = 90);
        $longitude = $this->faker->longitude($min = -180, $max = 180);

        return [
            'image' => $this->faker->imageUrl(640, 480, 'nature', true),
            'title' => $this->faker->sentence(6, true),
            'description' => $this->faker->text(200),
            'latitude' => $latitude,
            'longitude' => $longitude,
            'active' => $this->faker->boolean(80),
            'abuse' => $this->faker->boolean(20),
            'user_id' => User::query()->inRandomOrder()->first()->id ?? User::factory()->create()->id,
            'moderation_status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'report_count' => 0,
            // 'code' and 'location' are handled by model's boot method
        ];
    }
}
