<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Models\User;
use App\Services\BaseService;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Illuminate\Database\Eloquent\Collection;
use Exception;

class BaseServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $baseService;
    protected $mockRepository;


    protected function setUp(): void
    {
        parent::setUp();
        $this->mockRepository = $this->createMock(BaseRepository::class);
        $this->baseService = new class ($this->mockRepository) extends BaseService {};
    }

    #[Test]
    public function it_can_get_all_models()
    {
        $models = new Collection([new User, new User, new User]); // Cambiado de collect() a new Collection()

        $this->mockRepository->expects($this->once())
            ->method('all')
            ->willReturn($models);

        $results = $this->baseService->getAll();

        $this->assertInstanceOf(Collection::class, $results);
        $this->assertCount(3, $results);
    }

    #[Test]
    public function it_creates_a_new_model()
    {
        $data = ['key' => 'value'];
        $model = new class extends Model {};
        $this->mockRepository->expects($this->once())->method('create')->with($data)->willReturn($model);

        $result = $this->baseService->save($data);
        $this->assertInstanceOf(Model::class, $result);
    }

    #[Test]
    public function it_can_get_by_id()
    {
        $id = 1;
        $model = new class extends Model {};
        $this->mockRepository->method('find')->with($id)->willReturn($model);

        $result = $this->baseService->getById($id);
        $this->assertEquals($model, $result);
    }

    #[Test]
    public function it_can_update()
    {
        $model = new class extends Model {};
        $data = ['key' => 'new value'];
        $this->mockRepository->expects($this->once())->method('update')->with($model, $data)->willReturn($model);

        $result = $this->baseService->update($model, $data);
        $this->assertEquals($model, $result);
    }

    #[Test]
    public function it_can_delete()
    {
        $model = new class extends Model {};
        $this->mockRepository->expects($this->once())->method('delete')->with($model)->willReturn(true);

        $result = $this->baseService->delete($model);
        $this->assertTrue($result);
    }

    #[Test]
    public function it_can_handle_operations()
    {
        $operation = function () {
            return 'result';
        };

        $method = new \ReflectionMethod($this->baseService, 'handleOperations');
        $method->setAccessible(true);
        $result = $method->invoke($this->baseService, $operation);

        $this->assertEquals('result', $result);
    }

    #[Test]
    public function it_can_handle_operations_with_exception()
    {
        $operation = function () {
            throw new Exception('Error');
        };

        $method = new \ReflectionMethod($this->baseService, 'handleOperations');
        $method->setAccessible(true);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('An error occurred while executing the operation: Error');

        $method->invoke($this->baseService, $operation);
    }
}
