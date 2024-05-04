<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use App\Models\ModerationLog;
use App\Models\Stone;
use App\Models\Comment;
use App\Models\User;
use App\Repositories\ModerationLogRepository;

class ModerationLogRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private ModerationLogRepository $moderationLogRepository;

    protected function setUp(): void
    {
        parent::setUp();

        $this->moderationLogRepository = new ModerationLogRepository(new ModerationLog);
    }

    #[Test]
    public function get_logs_for_moderatable_stone_pagination(): void
    {
        $user = User::factory()->create();
        $stone = Stone::factory()->create();
        $log = ModerationLog::factory()->create([
            'moderatable_id' => $stone->id,
            'moderatable_type' => Stone::class,
            'action_by' => $user->id,
            'action_taken' => 'approved',
            'reason' => 'test reason',
        ]);

        $logs = $this->moderationLogRepository->getLogsForModeratable(Stone::class, $stone->id, 10);
        $this->assertTrue($logs->contains($log));
    }

    #[Test]
    public function get_logs_for_moderatable_comment_pagination(): void
    {
        $stone = Stone::factory()->create();
        $user = User::factory()->create();
        $comment = Comment::factory()->create([
            'stone_id' => $stone->id,
            'user_id' => $user->id,
        ]);

        $log = ModerationLog::factory()->create([
            'moderatable_id' => $comment->id,
            'moderatable_type' => Comment::class,
            'action_by' => $user->id,
            'action_taken' => 'approved',
            'reason' => 'test reason',
        ]);

        $logs = $this->moderationLogRepository->getLogsForModeratable(Comment::class, $comment->id, 10);
        $this->assertTrue($logs->contains($log));
    }

    #[Test]
    public function get_logs_by_user_pagination(): void
    {
        $user = User::factory()->create();
        $comment = Comment::factory()->create([
            'stone_id' => Stone::factory()->create()->id,
            'user_id' => $user->id,
        ]);

        $log = ModerationLog::factory()->create([
            'moderatable_id' => $comment->id,
            'moderatable_type' => Comment::class,
            'action_by' => $user->id,
            'action_taken' => 'approved',
            'reason' => 'test reason',
        ]);

        $logs = $this->moderationLogRepository->getLogsByUser($user->id, 10);
        $this->assertTrue($logs->contains($log));
    }
}
