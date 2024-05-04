<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
use App\Models\Comment;
use App\Models\User;
use App\Models\Stone;
use App\Repositories\CommentRepository;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $commentRepository;
    protected $user;
    protected $stone;

    protected $commentData;

    protected function setUp(): void
    {
        parent::setUp();
        $this->commentRepository = new CommentRepository(new Comment());
        $user = User::factory()->create();
        $stone = Stone::factory()->create();

        $this->commentData = [
            'stone_id' => $stone->id,
            'user_id' => $user->id,
            'content' => 'This is a test comment.',
            'active' => true,
            'abuse' => false,
            'moderation_status' => 'pending',
            'report_count' => 0,
        ];
    }

    #[Test]
    public function it_creates_a_comment()
    {
        $comment = $this->commentRepository->create($this->commentData);

        $this->assertInstanceOf(Comment::class, $comment);
        $this->assertEquals('This is a test comment.', $comment->content);
        $this->assertDatabaseHas('comments', ['content' => 'This is a test comment.']);
    }

    #[Test]
    public function it_updates_a_comment()
    {
        $comment = Comment::factory()->create();

        $updatedComment = $this->commentRepository->update($comment, ['content' => 'Updated Content']);

        $this->assertEquals('Updated Content', $updatedComment->content);
        $this->assertDatabaseHas('comments', ['id' => $comment->id, 'content' => 'Updated Content']);
    }

    #[Test]
    public function it_finds_a_comment()
    {
        $comment = Comment::factory()->create();

        $foundComment = $this->commentRepository->find($comment->id);

        $this->assertNotNull($foundComment);
        $this->assertEquals($comment->id, $foundComment->id);
    }

    #[Test]
    public function it_deletes_a_comment()
    {
        $comment = Comment::factory()->create();

        $success = $this->commentRepository->delete($comment);

        $this->assertTrue($success);
        $this->assertDatabaseMissing('comments', ['id' => $comment->id]);
    }

    #[Test]
    public function it_retrieves_all_comments()
    {
        Comment::factory()->count(5)->create();

        $comments = $this->commentRepository->all();

        $this->assertCount(5, $comments);
    }
}

