<?php

namespace Tests\Unit\Models;

use App\Models\ModerationLog;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class ModerationLogTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_fills_expected_attributes()
    {
        $attributes = [
            'moderatable_id' => 1,
            'moderatable_type' => 'App\Models\Stone',
            'action_by' => 1,
            'action_taken' => 'approved',
            'reason' => 'Valid entry'
        ];

        $moderationLog = new ModerationLog($attributes);

        foreach ($attributes as $key => $value) {
            $this->assertEquals($value, $moderationLog->{$key});
        }
    }

    #[Test]
    public function it_has_a_polymorphic_relation()
    {
        $user = User::factory()->create();
        $moderationLog = ModerationLog::create([
            'moderatable_id' => $user->id,
            'moderatable_type' => User::class,
            'action_by' => $user->id,
            'action_taken' => 'approved',
            'reason' => 'Test reason'
        ]);

        // Fetch the moderatable entity and verify its type
        $moderatableEntity = $moderationLog->moderatable()->getResults();
        $this->assertInstanceOf(User::class, $moderatableEntity);
        $this->assertEquals($user->id, $moderatableEntity->id);
    }
    #[Test]
    public function it_belongs_to_a_user()
    {
        $user = User::factory()->create();
        $moderationLog = ModerationLog::create([
            'moderatable_id' => $user->id,
            'moderatable_type' => User::class,
            'action_by' => $user->id,
            'action_taken' => 'approved',
            'reason' => 'Test reason'
        ]);

        $actionByUser = $moderationLog->user()->first();  // Correct usage
        $this->assertInstanceOf(User::class, $actionByUser);
        $this->assertEquals($user->id, $actionByUser->id);
    }
}
