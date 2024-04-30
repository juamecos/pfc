<?php

namespace Tests\Unit;

use App\Models\Found;
use App\Models\Stone;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

class FoundTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the relationships and spatial functionality.
     *
     * @return void
     */
    public function test_found_model_relationships_and_spatial_attributes()
    {
        $user = User::factory()->create();
        $stone = Stone::factory()->create();
        $found = Found::create([
            'stone_id' => $stone->id,
            'user_id' => $user->id,
            'latitude' => 34.0522,
            'longitude' => -118.2437,
            'country' => 'ES',
            'city' => 'Barcelona',
        ]);

        // Test Relationships
        $this->assertInstanceOf(Stone::class, $found->stone);
        $this->assertEquals($stone->id, $found->stone->id);
        $this->assertInstanceOf(User::class, $found->user);
        $this->assertEquals($user->id, $found->user->id);
        $this->assertEquals(34.0522, $found->latitude);
        $this->assertEquals(-118.2437, $found->longitude);
        $this->assertEquals('ES', $found->country);

        // Test setting location on saving
        $this->assertNotNull($found->location);
    }
}
