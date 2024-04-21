<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Comment;
use App\Models\User;
use App\Models\Stone;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test Comment relationships and properties.
     *
     * @return void
     */
    public function test_comment_attributes_and_relationships()
    {
        $user = User::factory()->create();
        $stone = Stone::factory()->create();
        $comment = new Comment([
            'stone_id' => $stone->id,
            'user_id' => $user->id,
            'content' => 'This is a comment.',
            'active' => true,
            'abuse' => false,
            'moderation_status' => 'approved',
            'report_count' => 0
        ]);

        // Persist data
        $comment->save();

        // Test fillable attributes
        $this->assertEquals('This is a comment.', $comment->content);
        $this->assertTrue($comment->active);
        $this->assertFalse($comment->abuse);
        $this->assertEquals('approved', $comment->moderation_status);
        $this->assertEquals(0, $comment->report_count);

        // Test relationships
        $this->assertInstanceOf(User::class, $comment->user);
        $this->assertEquals($user->id, $comment->user->id);
        $this->assertInstanceOf(Stone::class, $comment->stone);
        $this->assertEquals($stone->id, $comment->stone->id);

        // Test moderation logs relationship
        $this->assertCount(0, $comment->moderationLogs);
    }
}
