<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\Stone;
use App\Models\User;
use App\Models\Like;
use App\Models\Comment;
use App\Models\Found;
use App\Models\ModerationLog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use PHPUnit\Framework\Attributes\Test;

class StoneTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function database_has_expected_columns()
    {
        $this->assertTrue(
            Schema::hasColumns('stones', [
                'image',
                'title',
                'description',
                'latitude',
                'longitude',
                'active',
                'abuse',
                'code',
                'user_id',
                'moderation_status',
                'report_count',
                'location'
            ]),
            1
        );
    }

    #[Test]
    public function stone_model_relationships_are_correct()
    {
        $user = User::factory()->create();
        $stone = Stone::factory()->create();
        $like = Like::factory()->create(['stone_id' => $stone->id]);
        $comment = Comment::factory()->create(['stone_id' => $stone->id]);
        $found = Found::factory()->create(['stone_id' => $stone->id]);
        $modLog = ModerationLog::factory()->create([
            'moderatable_id' => $stone->id,
            'moderatable_type' => 'App\Models\Stone',
            'action_by' => $user->id,  // Ensure this is set correctly
            'action_taken' => 'approved',
            'reason' => 'Initial check'
        ]);

        $stone->user()->associate($user)->save();

        $this->assertInstanceOf(User::class, $stone->user);
        $this->assertEquals($user->id, $stone->user->id);
        $this->assertTrue($stone->likes->contains($like));
        $this->assertTrue($stone->comments->contains($comment));
        $this->assertTrue($stone->founds->contains($found));
        $this->assertTrue($stone->moderationLogs->contains($modLog));
    }

    #[Test]
    public function stone_handles_moderation_correctly()
    {
        $stone = Stone::factory()->create(['report_count' => 3]);
        $stone->report();
        $this->assertEquals('pending', $stone->moderation_status);
    }

    #[Test]
    public function stone_sets_location_correctly()
    {
        $stone = Stone::factory()->make([
            'latitude' => 34.0522,
            'longitude' => -118.2437
        ]);

        $stone->save();

        $this->assertNotNull($stone->location);
    }
}
