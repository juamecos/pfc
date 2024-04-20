<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'avatar' => $this->faker->imageUrl(100, 100),
            'role' => $this->faker->randomElement(['user', 'moderator', 'admin']),
            'active' => $this->faker->boolean,
            'bio' => $this->faker->text,
            'country' => $this->faker->countryCode,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the user is an admin.
     */
    public function admin()
    {
        return $this->state(function (array $attributes) {
            return [
                'role' => 'admin',
            ];
        });
    }

    /**
     * Indicate that the user is a moderator.
     */
    public function moderator()
    {
        return $this->state(function (array $attributes) {
            return [
                'role' => 'moderator',
            ];
        });
    }

    /**
     * Indicate that the user is a regular user.
     */
    public function user()
    {
        return $this->state(function (array $attributes) {
            return [
                'role' => 'user',
            ];
        });
    }
}
