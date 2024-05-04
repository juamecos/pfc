<?php

namespace Tests\Unit\Services;

use Mockery;
use Tests\TestCase;
use App\Services\ModerationLogService;
use App\Repositories\ModerationLogRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use PHPUnit\Framework\Attributes\Test;

class ModerationLogServiceTest extends TestCase
{
    private $moderationLogRepositoryMock;
    private $moderationLogService;

    protected function setUp(): void
    {
        parent::setUp();

        // Crear un mock para ModerationLogRepository
        $this->moderationLogRepositoryMock = Mockery::mock(ModerationLogRepository::class);
        $this->moderationLogService = new ModerationLogService($this->moderationLogRepositoryMock);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    #[Test]
    public function test_get_logs_for_moderatable(): void
    {
        // Crear un paginador simulado
        $paginatorMock = Mockery::mock(LengthAwarePaginator::class);

        // Configurar el mock para el método getLogsForModeratable
        $this->moderationLogRepositoryMock->shouldReceive('getLogsForModeratable')
            ->with('App\Models\SomeModel', 1, 10, ['*'])
            ->andReturn($paginatorMock);

        // Probar el método del servicio
        $result = $this->moderationLogService->getLogsForModeratable('App\Models\SomeModel', 1, 10);

        $this->assertSame($paginatorMock, $result);
    }

    #[Test]
    public function test_get_logs_by_user(): void
    {
        // Crear un paginador simulado
        $paginatorMock = Mockery::mock(LengthAwarePaginator::class);

        // Configurar el mock para el método getLogsByUser
        $this->moderationLogRepositoryMock->shouldReceive('getLogsByUser')
            ->with(1, 10, ['*'])
            ->andReturn($paginatorMock);

        // Probar el método del servicio
        $result = $this->moderationLogService->getLogsByUser(1, 10);

        $this->assertSame($paginatorMock, $result);
    }
}
