<?php

namespace App\Services;

use Exception;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;

abstract class BaseService
{
    protected $repository;

    public function __construct(BaseRepository $repository)
    {
        $this->repository = $repository;
    }

    public function getAll()
    {
        return $this->handleOperations(fn() => $this->repository->all(), __METHOD__);
    }

    public function getById($id)
    {
        return $this->handleOperations(fn() => $this->repository->find($id), __METHOD__);
    }

    public function save(array $data)
    {
        $this->authorize();
        return $this->handleOperations(fn() => $this->repository->create($data), __METHOD__);
    }

    public function update(Model $model, array $data)
    {
        $this->authorizeOwnership($model);
        return $this->handleOperations(fn() => $this->repository->update($model, $data), __METHOD__);
    }

    public function delete(Model $model)
    {
        $this->authorizeOwnership($model);
        return $this->handleOperations(fn() => $this->repository->delete($model), __METHOD__);
    }

    protected function handleOperations(callable $operation, string $methodName)
    {
        try {
            return $operation();
        } catch (Exception $e) {
            throw new Exception(sprintf("Error in %s: %s", $methodName, $e->getMessage()), 0, $e);
        }
    }

    protected function authorize()
    {
        if (!Auth::check()) {
            throw new Exception("Unauthorized access - User must be logged in.");
        }
    }

    protected function authorizeOwnership(Model $model)
    {
        $userId = Auth::id();
        if ($model->user_id !== $userId && !Auth::user()->hasRole(['admin', 'moderator'])) {
            throw new Exception("Unauthorized access - Users can only modify their own models unless they are admin/moderator");
        }
    }
}