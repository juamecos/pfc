<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
use App\Models\User;
use App\Models\Stone;
use App\Repositories\StoneRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use PHPUnit\Framework\Attributes\Test;

class StoneRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $stoneRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->stoneRepository = new StoneRepository(new Stone);
    }

    #[Test]
    public function it_retrieves_stones_ordered_by_proximity()
    {
        // Arrange: Create some stones
        Stone::factory()->count(10)->create();

        // Act: Retrieve stones ordered by proximity (assuming a latitude and longitude)
        $result = $this->stoneRepository->getStonesOrderedByProximity(10.0, 10.0);

        // Assert: Check if the result is either Collection or Paginator
        $this->assertTrue($result instanceof Collection || $result instanceof LengthAwarePaginator);
        $this->assertNotEmpty($result);
    }

    #[Test]
    public function it_retrieves_stones_ordered_by_proximity_with_pagination()
    {
        $user = User::first(); // Ensure there's a user in your database.

        if (!$user) {
            // Optionally create a user if none exists.
            $user = User::create([
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => bcrypt('password'), // Use a hashed password
            ]);
        }

        $latitude = 10.0;
        $longitude = 10.0;

        // Create 25 stones with increasing distance
        for ($i = 1; $i <= 25; $i++) {
            Stone::create([
                'image' => 'path/to/image.jpg',
                'title' => "Stone $i",
                'description' => "Description of Stone $i",
                'latitude' => $latitude + ($i * 0.01),
                'longitude' => $longitude + ($i * 0.01),
                'country' => 'Country',
                'city' => 'City',
                'active' => true,
                'abuse' => false,
                'user_id' => $user->id,
                'moderation_status' => 'pending',
                'report_count' => 0
            ]);
        }

        $perPage = 20; // Items per page

        $results = Stone::orderByNearest($latitude, $longitude, $perPage);

        $this->assertInstanceOf(LengthAwarePaginator::class, $results, "The result should be an instance of LengthAwarePaginator.");
        $this->assertEquals(20, $results->count(), "Should only contain 20 items on the first page.");

        // Check if each subsequent stone is farther than the previous
        $stones = $results->items();
        $previousDistance = 0.0;
        foreach ($stones as $index => $stone) {
            $currentDistance = $stone->distance;
            if ($index > 0) { // Skip the first stone as there is no previous stone to compare
                $this->assertGreaterThan($previousDistance, $currentDistance, "Stone at index $index should be farther than the previous stone.");
            }
            $previousDistance = $currentDistance;
        }

        // // Ensure pagination is working
        $this->assertCount(20, $results->items(), "Should only contain 20 items on the first page.");
        $this->assertEquals(1, $results->currentPage(), "The current page should be 1.");
        $this->assertEquals(25, $results->total(), "Total stones should be 25.");
    }

    #[Test]
    public function it_retrieves_stones_within_bounding_box()
    {
        // Arrange: Create stones within the bounding box
        Stone::factory()->count(5)->create([
            'latitude' => 10,
            'longitude' => 10
        ]);
        Stone::factory()->count(5)->create([
            'latitude' => 6,
            'longitude' => 6
        ]);

        // Define bounding box coordinates
        $northEast = ['latitude' => 15.0, 'longitude' => 15.0];
        $southWest = ['latitude' => 5.0, 'longitude' => 5.0];

        // Act: Retrieve stones within the bounding box
        $result = $this->stoneRepository->getStonesWithinBoundingBox($northEast, $southWest);

        // Assert: Check the result type and contents
        $this->assertTrue($result instanceof LengthAwarePaginator || $result instanceof Collection);
        $this->assertNotEmpty($result);
    }
}