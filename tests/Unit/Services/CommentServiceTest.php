<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Models\Comment;
use App\Repositories\CommentRepository;
use App\Services\CommentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery;

use PHPUnit\Framework\Attributes\Test;

class CommentServiceTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $commentService;
    protected $commentRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->commentRepository = Mockery::mock(CommentRepository::class);
        $this->commentService = new CommentService($this->commentRepository);
    }

    #[Test]
    public function it_gets_active_comments_by_stone_id()
    {
        // Set up
        $stoneId = 1;
        $perPage = 10;
        $expected = new LengthAwarePaginator([], 0, $perPage);
        $this->commentRepository
            ->shouldReceive('filteredPagination')
            ->once()
            ->with($perPage, ['stone_id' => $stoneId, 'active' => true])
            ->andReturn($expected);

        // Act
        $result = $this->commentService->getActiveCommentsByStoneId($perPage, $stoneId);

        // Assert
        $this->assertEquals($expected, $result);
    }


    #[Test]
    public function it_gets_comments_by_user_id()
    {
        $this->perform_filtered_pagination_test('getCommentsByUserId', ['user_id' => $this->faker->randomNumber()]);
    }

    public function perform_filtered_pagination_test($methodName, $filters)
    {
        $perPage = 10;
        $expectedResult = collect();

        $this->commentRepository
            ->shouldReceive('filteredPagination')
            ->with($perPage, $filters)
            ->andReturn($expectedResult);

        $result = $this->commentService->$methodName($perPage, array_values($filters)[0]);

        $this->assertEquals($expectedResult, $result);
    }

    #[Test]
    public function it_reports_a_comment()
    {
        $commentId = $this->faker->randomNumber();
        $comment = Mockery::mock(Comment::class);

        $this->commentRepository
            ->shouldReceive('find')
            ->with($commentId)
            ->andReturn($comment);

        $comment
            ->shouldReceive('report')
            ->andReturn(true);

        $result = $this->commentService->reportComment($commentId);

        $this->assertTrue($result);
    }

    #[Test]
    public function it_moderates_a_comment()
    {
        $commentId = $this->faker->randomNumber();
        $action = 'approved';
        $reason = 'Valid content';
        $comment = Mockery::mock(Comment::class);

        $this->commentRepository
            ->shouldReceive('find')
            ->with($commentId)
            ->andReturn($comment);

        $comment
            ->shouldReceive('moderate')
            ->with($action, $reason)
            ->andReturn(true);

        $result = $this->commentService->moderateComment($commentId, $action, $reason);

        $this->assertTrue($result);
    }

    #[Test]
    public function it_handles_comment_not_found_exception()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage("Comment not found with ID: 999");

        $this->commentRepository
            ->shouldReceive('find')
            ->with(999)
            ->andReturn(null);

        $this->commentService->reportComment(999);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
