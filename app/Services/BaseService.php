<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;

abstract class BaseService
{
    /**
     * The repository associated with the service.
     *
     * @var BaseRepository
     */
    protected $repository;

    /**
     * BaseService constructor.
     *
     * @param BaseRepository $repository
     */
    public function __construct(BaseRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get all records.
     *
     * @return \Illuminate\Database\Eloquent\Collection|Model[]
     */
    public function getAll()
    {
        return $this->repository->all();
    }

    /**
     * Save a new record.
     *
     * @param array $data
     * @return Model
     */
    public function save($data)
    {
        return $this->repository->create($data);
    }

    /**
     * Find a record by ID.
     *
     * @param mixed $id
     * @return Model|null
     */
    public function getById($id)
    {
        return $this->repository->find($id);
    }

    /**
     * Update a record.
     *
     * @param Model $model
     * @param array $data
     * @return Model
     */
    public function update(Model $model, array $data)
    {
        return $this->repository->update($model, $data);
    }

    /**
     * Delete a record.
     *
     * @param Model $model
     * @return bool|null
     */
    public function delete(Model $model)
    {
        return $this->repository->delete($model);
    }

    /**
     * Handle operations and manage exceptions.
     *
     * @param callable $operation
     * @return mixed
     * @throws Exception
     */
    protected function handleOperations(callable $operation)
    {
        try {
            return $operation();
        } catch (Exception $e) {
            // Here you can log the exception or handle it as per your application's needs
            throw new Exception('An error occurred while executing the operation: ' . $e->getMessage(), 0, $e);
        }
    }
}
