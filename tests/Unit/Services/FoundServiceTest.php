<?php

namespace Tests\Unit\Services;

use Mockery;
use Tests\TestCase;
use App\Models\Found;
use App\Services\FoundService;
use App\Repositories\FoundRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use PHPUnit\Framework\Attributes\Test;

class FoundServiceTest extends TestCase
{
    private $foundRepositoryMock;
    private $foundService;

    protected function setUp(): void
    {
        parent::setUp();

        // Crear un mock para FoundRepository
        $this->foundRepositoryMock = Mockery::mock(FoundRepository::class);
        $this->foundService = new FoundService($this->foundRepositoryMock);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    #[Test]
    public function get_all_with_relations(): void
    {
        // Crear un paginador simulado
        $paginatorMock = Mockery::mock(LengthAwarePaginator::class);
        $this->foundRepositoryMock->shouldReceive('getAllWithRelations')
            ->with(null, [])
            ->andReturn($paginatorMock);

        // Probar el método del servicio
        $result = $this->foundService->getAllWithRelations();

        $this->assertSame($paginatorMock, $result);
    }


}
