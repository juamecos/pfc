<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
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
        // Arrange: Ensure there are enough records to paginate
        Stone::factory()->count(30)->create([
            'latitude' => 10.5,
            'longitude' => 10.5
        ]);

        // Act: Retrieve paginated results
        $result = $this->stoneRepository->getStonesOrderedByProximity(10.0, 10.0, 10);

        // Assert: Check for pagination
        $this->assertInstanceOf(LengthAwarePaginator::class, $result);
        $this->assertEquals(10, $result->count());
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