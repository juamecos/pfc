<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
use App\Models\Like;
use App\Models\User;
use App\Models\Stone;
use App\Repositories\LikeRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class LikeRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $likeRepository;
    protected $user;
    protected $stone;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->stone = Stone::factory()->create();
        $this->likeRepository = new LikeRepository(new Like);
    }


    #[Test]
    public function it_find_by_user_and_stone()
    {
        $like = Like::factory()->create([
            'user_id' => $this->user->id,
            'stone_id' => $this->stone->id,
        ]);

        $found = $this->likeRepository->findByUserAndStone($this->user->id, $this->stone->id);

        $this->assertNotNull($found);
        $this->assertEquals($like->id, $found->id);
    }

    #[Test]
    public function it_count_by_stone_id()
    {
        Like::factory()->count(3)->create(['stone_id' => $this->stone->id]);
        $count = $this->likeRepository->countByStoneId($this->stone->id);

        $this->assertEquals(3, $count);
    }


    #[Test]
    public function it_count_by_user_id()
    {
        Like::factory()->count(2)->create(['user_id' => $this->user->id]);
        $count = $this->likeRepository->countByUserId($this->user->id);

        $this->assertEquals(2, $count);
    }
}
