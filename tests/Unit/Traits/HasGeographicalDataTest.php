<?php

namespace Tests\Unit;

use App\Models\Stone;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use App\Traits\HasGeographicalData;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Exception;

class HasGeographicalDataTest extends TestCase
{
    use RefreshDatabase, HasGeographicalData;

    #[Test]
    public function test_location_is_set_when_both_latitude_and_longitude_are_provided()
    {
        $stone = Stone::factory()->make([
            'latitude' => 34.0522,
            'longitude' => -118.2437
        ]);

        $stone->save();

        $this->assertNotNull($stone->location);
    }


    #[Test]
    public function it_fails_to_set_location_with_invalid_data()
    {
        $this->expectException(Exception::class);
        $stone = new Stone(['latitude' => null, 'longitude' => -118.2437]);
        $stone->setLocation();
    }

    #[Test]
    public function it_can_calculate_the_distance_to_another_point()
    {
        $stone = new Stone(['latitude' => 1.23, 'longitude' => 4.56]);
        $distance = $stone->distanceTo(2.34, 5.67);
        $this->assertIsNumeric($distance);
        $this->assertGreaterThan(0, $distance);
    }

    #[Test]
    public function it_handles_distance_calculation_with_invalid_location()
    {
        $this->expectException(Exception::class);
        $stone = new Stone();  // No location set
        $stone->distanceTo(34.0522, -118.2438);
    }

    #[Test]
    public function it_retrieves_models_within_bounding_box()
    {
        // Create a stone inside the bounding box
        $stoneInside = Stone::factory()->create([
            'latitude' => 72.309349,  // Specific latitude within the bounding box
            'longitude' => -35.221199  // Specific longitude within the bounding box
        ]);

        // Create a stone outside the bounding box
        $stoneOutside = Stone::factory()->create([
            'latitude' => 65.893633,  // Latitude outside the bounding box
            'longitude' => 18.050501   // Longitude outside the bounding box
        ]);

        // Define bounding box coordinates with associative keys
        $northEast = ['latitude' => 72.310, 'longitude' => -35.220]; // North East coordinates
        $southWest = ['latitude' => 72.308, 'longitude' => -35.222]; // South West coordinates

        // Test
        $results = Stone::withinBoundingBox($northEast, $southWest);

        // Assertions
        $this->assertTrue($results->contains('id', $stoneInside->id), "Stone inside the bounding box was not retrieved.");
        $this->assertFalse($results->contains('id', $stoneOutside->id), "Stone outside the bounding box was incorrectly retrieved.");
    }


    #[Test]
    public function it_handles_empty_results_for_bounding_box()
    {
        // Make sure to pass both coordinates as associative arrays with 'latitude' and 'longitude' keys
        $northEast = ['latitude' => 35.0000, 'longitude' => -119.0000]; // North East coordinates
        $southWest = ['latitude' => 34.9999, 'longitude' => -119.0001]; // South West coordinates

        // Execute the query
        $results = Stone::withinBoundingBox($northEast, $southWest);

        // Assertions
        $this->assertCount(0, $results, "Expected no stones within the bounding box but got some.");
    }

    #[Test]
    public function it_orders_models_by_nearest()
    {
        // Define the reference point closer to the "nearStone"
        $referenceLatitude = 72.309350;
        $referenceLongitude = -35.221200;

        // Create a stone near the reference point
        $nearStone = Stone::factory()->create([
            'latitude' => 72.309349,  // Very close to the reference point
            'longitude' => -35.221199
        ]);

        // Create two stones far from the reference point
        $farStone1 = Stone::factory()->create([
            'latitude' => 65.893633,  // Much further away
            'longitude' => 18.050501
        ]);

        $farStone2 = Stone::factory()->create([
            'latitude' => 34.0522,    // Another distant point
            'longitude' => -118.2437
        ]);


        // Fetch sorted stones and execute the query
        $sortedStones = Stone::orderByNearest($referenceLatitude, $referenceLongitude);

        // Assertions
        $this->assertEquals($nearStone->id, $sortedStones->first()->id, "The nearest stone should be the closest to the reference point.");
        $this->assertNotEquals($farStone1->id, $sortedStones->first()->id, "Far stone 1 should not be the nearest.");
        $this->assertNotEquals($farStone2->id, $sortedStones->first()->id, "Far stone 2 should not be the nearest.");

        // Additional checks to ensure the order is correct
        $this->assertTrue($sortedStones[1]->id == $farStone1->id || $sortedStones[1]->id == $farStone2->id, "One of the far stones should be second closest.");
        $this->assertTrue($sortedStones[2]->id == $farStone1->id || $sortedStones[2]->id == $farStone2->id, "One of the far stones should be the farthest.");
    }

    #[Test]
    public function it_orders_models_by_nearest_with_pagination()
    {
        Stone::factory()->count(20)->create();
        $perPage = 5; // Items per page
        $latitude = 10.0;
        $longitude = 10.0;

        // Execute the method with pagination
        $paginatedResults = Stone::orderByNearest($latitude, $longitude, $perPage);

        // Assertions
        $this->assertInstanceOf(LengthAwarePaginator::class, $paginatedResults);
        $this->assertCount($perPage, $paginatedResults);
        $this->assertEquals(1, $paginatedResults->currentPage());

    }
    #[Test]
    public function it_handles_ordering_with_no_stones_present()
    {
        $referenceLatitude = 34.0525;
        $referenceLongitude = -118.2440;

        $stones = Stone::orderByNearest($referenceLatitude, $referenceLongitude);
        $this->assertCount(0, $stones);
    }

    #[Test]
    public function it_throws_an_exception_when_the_location_is_not_set()
    {
        $this->expectException(Exception::class);
        $stone = new Stone();  // No latitude or longitude provided
        $stone->setLocation();
    }

    #[Test]
    public function it_throws_an_exception_when_the_operation_fails()
    {
        $this->expectException(Exception::class);
        $stone = new Stone(['latitude' => 1.23]);  // Longitude is missing
        $stone->setLocation();
    }
}
