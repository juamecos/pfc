<?php

namespace Tests\Unit;

use App\Models\Found;
use App\Models\Stone;
use App\Models\User;
use App\Repositories\FoundRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class FoundRepositoryTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_get_all_founds_with_relations()
    {
        // Arrange
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $stone1 = Stone::factory()->create();
        $stone2 = Stone::factory()->create();

        $found1 = Found::factory()->create([
            'user_id' => $user1->id,
            'stone_id' => $stone1->id,
            'latitude' => 37.7749,
            'longitude' => -122.4194,
            'country' => 'USA',
            'city' => 'San Francisco',
        ]);

        $found2 = Found::factory()->create([
            'user_id' => $user2->id,
            'stone_id' => $stone2->id,
            'latitude' => 51.5074,
            'longitude' => -0.1278,
            'country' => 'UK',
            'city' => 'London',
        ]);

        $repository = new FoundRepository(new Found());

        // Act
        $results = $repository->getAllWithRelations();

        // Assert
        $this->assertCount(2, $results);
        $this->assertTrue($results->contains($found1));
        $this->assertTrue($results->contains($found2));
        $this->assertEquals($user1->id, $results->first()->user->id);
        $this->assertEquals($stone1->id, $results->first()->stone->id);
        $this->assertEquals('USA', $results->first()->country);
        $this->assertEquals('San Francisco', $results->first()->city);
    }

    #[Test]
    public function it_can_get_paginated_founds_with_relations()
    {
        // Arrange
        $user = User::factory()->create();
        $stone = Stone::factory()->create();

        $found1 = Found::factory()->create([
            'user_id' => $user->id,
            'stone_id' => $stone->id,
            'latitude' => 37.7749,
            'longitude' => -122.4194,
            'country' => 'USA',
            'city' => 'San Francisco',
        ]);

        $found2 = Found::factory()->create([
            'user_id' => $user->id,
            'stone_id' => $stone->id,
            'latitude' => 51.5074,
            'longitude' => -0.1278,
            'country' => 'UK',
            'city' => 'London',
        ]);

        $repository = new FoundRepository(new Found());

        // Act
        $results = $repository->getAllWithRelations(1);

        // Assert
        $this->assertCount(1, $results);
        $this->assertTrue($results->contains($found1));
        $this->assertEquals($user->id, $results->first()->user->id);
        $this->assertEquals($stone->id, $results->first()->stone->id);
        $this->assertEquals('USA', $results->first()->country);
        $this->assertEquals('San Francisco', $results->first()->city);
    }

    #[Test]
    public function it_can_filter_founds_with_relations()
    {
        // Arrange
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $stone = Stone::factory()->create();

        $found1 = Found::factory()->create([
            'user_id' => $user1->id,
            'stone_id' => $stone->id,
            'latitude' => 37.7749,
            'longitude' => -122.4194,
            'country' => 'USA',
            'city' => 'San Francisco',
        ]);

        $found2 = Found::factory()->create([
            'user_id' => $user2->id,
            'stone_id' => $stone->id,
            'latitude' => 51.5074,
            'longitude' => -0.1278,
            'country' => 'UK',
            'city' => 'London',
        ]);

        $repository = new FoundRepository(new Found());

        // Act
        $results = $repository->getAllWithRelations(null, ['country' => 'USA']);

        // Assert
        $this->assertCount(1, $results);
        $this->assertTrue($results->contains($found1));
        $this->assertEquals($user1->id, $results->first()->user->id);
        $this->assertEquals($stone->id, $results->first()->stone->id);
        $this->assertEquals('USA', $results->first()->country);
        $this->assertEquals('San Francisco', $results->first()->city);
    }
}