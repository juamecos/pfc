<?php

namespace Tests\Unit\Traits;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Stone;
use App\Models\ModerationLog;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class HandlesModerationTest extends TestCase
{
    use RefreshDatabase; // This will refresh the database after each test

    #[\PHPUnit\Framework\Attributes\Test]
    public function a_visitor_can_report_an_item()
    {
        $stone = Stone::factory()->create();

        $stone->report();

        $this->assertEquals(1, $stone->report_count);
    }

    public function reporting_an_item_creates_a_moderation_log_when_status_changes_to_pending()
    {
        $stone = Stone::factory()->create();
        $stone->report();

        $this->assertEquals(1, $stone->report_count);
        $this->assertEquals('pending', $stone->moderation_status);

        // Check that a ModerationLog entry has been created
        $log = ModerationLog::latest()->first();
        $this->assertNotNull($log);
        $this->assertEquals('pending', $log->action_taken);
        $this->assertEquals('Automatic moderation status update after multiple reports', $log->reason);
        $this->assertEquals($stone->id, $log->moderatable_id);
        $this->assertNull($log->action_by); // No user should be associated since it's a system action
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_increments_report_count()
    {
        // Create a Stone instance
        $stone = Stone::factory()->create();

        // Initially report_count should be 0
        $this->assertEquals(0, $stone->report_count);

        // Increment report_count once
        $stone->report();

        // Check if report_count is 1
        $this->assertEquals(1, $stone->report_count);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function an_exception_is_thrown_if_an_unauthorized_user_attempts_to_moderate()
    {
        $this->expectException(Exception::class);

        $stone = Stone::factory()->create();
        $user = User::factory()->create(['role' => 'user']);
        Auth::login($user);

        $stone->moderate('approved', 'Trying to approve without permissions');
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_logs_moderation_action_for_stone()
    {
        // Create a Stone instance
        $stone = Stone::factory()->create();
        $moderator = User::factory()->create(['role' => 'moderator']);
        Auth::login($moderator);

        // Perform a moderation action
        $stone->moderate('approved', 'No issues found.');

        // Reload the stone instance from the database to get updated values
        $stone = $stone->fresh();

        // Check if moderation action is logged
        $this->assertCount(1, $stone->moderationLogs);

        // Check if the moderation action is correctly logged
        $this->assertEquals('approved', $stone->moderationLogs->first()->action_taken);
        $this->assertEquals('No issues found.', $stone->moderationLogs->first()->reason);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_updates_abuse_and_active_status_based_on_moderation_action_for_stone()
    {
        // Create a Stone instance
        $stone = Stone::factory()->create();
        $moderator = User::factory()->create(['role' => 'moderator']);
        Auth::login($moderator);


        // Perform a moderation action to reject
        $stone->moderate('rejected', 'Contains inappropriate content.');

        // Check if abuse and active status are updated accordingly
        $this->assertTrue($stone->abuse);
        $this->assertFalse($stone->active);

        // Perform a moderation action to approve
        $stone->moderate('approved', 'No issues found.');

        // Check if abuse and active status are updated accordingly
        $this->assertFalse($stone->abuse);
        $this->assertTrue($stone->active);
    }

}

