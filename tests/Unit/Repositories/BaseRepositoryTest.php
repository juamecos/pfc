<?php

namespace Tests\Unit\Repositories;

use Tests\TestCase;
use App\Models\User;
use App\Repositories\BaseRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\Collection;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Pagination\LengthAwarePaginator;


class BaseRepositoryTest extends TestCase
{
    use RefreshDatabase;

    protected $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new BaseRepository(new User);
    }

    #[Test]
    public function it_retrieves_all_models()
    {
        User::factory()->count(3)->create();

        $allUsers = $this->repository->all();

        $this->assertInstanceOf(Collection::class, $allUsers);
        $this->assertCount(3, $allUsers);
    }

    #[Test]
    public function it_creates_a_new_model()
    {
        $userData = ['name' => 'John Doe', 'email' => 'john@example.com', 'password' => bcrypt('password')];

        $user = $this->repository->create($userData);

        $this->assertDatabaseHas('users', ['email' => 'john@example.com']);
        $this->assertEquals('John Doe', $user->name);
    }

    #[Test]
    public function it_finds_a_model_by_id()
    {
        $user = User::factory()->create();

        $foundUser = $this->repository->find($user->id);

        $this->assertNotNull($foundUser);
        $this->assertEquals($user->id, $foundUser->id);
    }

    #[Test]
    public function it_updates_a_model()
    {
        $user = User::factory()->create(['name' => 'Original Name']);

        $updatedUser = $this->repository->update($user, ['name' => 'Updated Name']);

        $this->assertEquals('Updated Name', $updatedUser->name);
        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Updated Name']);
    }

    #[Test]
    public function it_deletes_a_model()
    {
        $user = User::factory()->create();

        $success = $this->repository->delete($user);

        $this->assertTrue($success);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
    #[Test]
    public function it_can_paginate_results()
    {
        User::factory()->count(50)->create();  // Assuming you want to test pagination out of 50 entries
        $results = $this->repository->filteredPagination(10);  // Testing pagination with 10 items per page

        $this->assertInstanceOf(LengthAwarePaginator::class, $results);
        $this->assertCount(10, $results);
        $this->assertEquals(1, $results->currentPage());
        $this->assertEquals(10, $results->perPage());
        $this->assertEquals(50, $results->total());
    }

    #[Test]
    public function it_can_paginate_with_filters()
    {
        User::factory()->count(25)->create(['active' => true]);
        User::factory()->count(25)->create(['active' => false]);
        $results = $this->repository->filteredPagination(10, ['active' => true]);

        $this->assertCount(10, $results->items());
        $this->assertEquals(25, $results->total());
        foreach ($results->items() as $user) {
            $this->assertTrue($user->active);
        }
    }

    #[Test]
    public function it_can_paginate_with_specific_columns()
    {
        User::factory()->count(30)->create();
        $results = $this->repository->filteredPagination(10, [], ['name', 'email']);

        $this->assertCount(10, $results->items());
        $firstUser = $results->items()[0];
        $this->assertNotNull($firstUser->name);
        $this->assertNotNull($firstUser->email);
        $this->assertNull($firstUser->created_at);  // Assuming 'created_at' is not in the selected columns
    }

    #[Test]
    public function it_handles_empty_results()
    {
        $results = $this->repository->filteredPagination(10);

        $this->assertInstanceOf(LengthAwarePaginator::class, $results);
        $this->assertCount(0, $results->items());
        $this->assertEquals(0, $results->total());
    }

}
