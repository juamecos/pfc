<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;

/**
 * Abstract base service that provides common functionality to all service classes.
 * This includes basic CRUD operations and exception handling.
 */
abstract class BaseService
{
    /**
     * @var BaseRepository The repository associated with the service.
     */
    protected $repository;

    /**
     * Create a new service instance.
     * 
     * @param BaseRepository $repository The repository used by the service.
     */
    public function __construct(BaseRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Retrieve all models from the repository.
     * 
     * @return mixed The result of the repository all method.
     */
    public function getAll()
    {
        return $this->handleOperations(fn() => $this->repository->all(), __METHOD__);
    }

    /**
     * Retrieve a model by its ID.
     * 
     * @param mixed $id The model ID to find.
     * @return mixed The result of the repository find method.
     */
    public function getById($id)
    {
        return $this->handleOperations(fn() => $this->repository->find($id), __METHOD__);
    }

    /**
     * Save a new model via the repository.
     * 
     * @param array $data Data used to create the model.
     * @return mixed The result of the repository create method.
     */
    public function save(array $data)
    {
        return $this->handleOperations(fn() => $this->repository->create($data), __METHOD__);
    }

    /**
     * Update an existing model.
     * 
     * @param Model $model The model to update.
     * @param array $data The data for updating the model.
     * @return mixed The result of the repository update method.
     */
    public function update(Model $model, array $data)
    {
        return $this->handleOperations(fn() => $this->repository->update($model, $data), __METHOD__);
    }

    /**
     * Delete a model via the repository.
     * 
     * @param Model $model The model to delete.
     * @return mixed The result of the repository delete method.
     */
    public function delete(Model $model)
    {
        return $this->handleOperations(fn() => $this->repository->delete($model), __METHOD__);
    }

    /**
     * Handle operations and manage exceptions with detailed error messages.
     * 
     * @param callable $operation The repository operation to perform.
     * @param string $methodName The name of the method where the operation is called.
     * @return mixed The result of the operation.
     * @throws Exception If an exception occurs during the operation.
     */
    protected function handleOperations(callable $operation, string $methodName)
    {
        try {
            return $operation();
        } catch (Exception $e) {
            $errorMsg = sprintf("Error in %s: %s", $methodName, $e->getMessage());
            throw new Exception($errorMsg, 0, $e);
        }
    }
}
