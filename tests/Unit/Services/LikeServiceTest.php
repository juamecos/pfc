<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Models\Like;
use App\Models\User;
use App\Models\Stone;
use App\Services\LikeService;
use App\Repositories\LikeRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LikeServiceTest extends TestCase
{
    use RefreshDatabase;

    private $service;

    protected function setUp(): void
    {
        parent::setUp();
        $likeRepository = new LikeRepository(new Like);
        $this->service = new LikeService($likeRepository);
    }

    public function test_toggle_like_creates_like_when_none_exists()
    {
        $user = User::factory()->create();
        $stone = Stone::factory()->create();

        $result = $this->service->toggleLike($user->id, $stone->id);

        $this->assertDatabaseHas('likes', [
            'user_id' => $user->id,
            'stone_id' => $stone->id
        ]);
    }

    public function test_toggle_like_deletes_like_when_exists()
    {
        $user = User::factory()->create();
        $stone = Stone::factory()->create();
        $like = Like::create([
            'user_id' => $user->id,
            'stone_id' => $stone->id
        ]);

        $result = $this->service->toggleLike($user->id, $stone->id);

        $this->assertDatabaseMissing('likes', [
            'id' => $like->id
        ]);
    }

    public function test_count_by_stone_id()
    {
        // Assuming you want to explicitly set an ID

        $stone = Stone::factory()->create();

        // Creating users for unique likes
        $users = User::factory()->count(3)->create();

        // Creating a like from each user
        foreach ($users as $user) {
            Like::factory()->create([
                'user_id' => $user->id,
                'stone_id' => $stone->id
            ]);
        }

        $count = $this->service->countByStoneId($stone->id);
        $this->assertEquals(3, $count);
    }

    public function test_count_by_user_id()
    {

        $stones = Stone::factory(3)->create();
        $user = User::factory()->create();

        foreach ($stones as $stone) {
            error_log(print_r($stone->id, true));
            Like::factory()->create([
                'user_id' => $user->id,
                'stone_id' => $stone->id
            ]);
        }

        $count = $this->service->countByUserId($user->id);

        $this->assertEquals(3, $count);
    }
}
