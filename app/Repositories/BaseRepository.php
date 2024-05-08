<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Class BaseRepository
 * @package App\Repositories
 */
class BaseRepository
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @return Collection
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    /**
     * Paginate the given query into a simple paginator.
     *
     * @param int $perPage
     * @param array $filter
     * @param array $columns
     * @return LengthAwarePaginator
     */
    public function filteredPagination($perPage = null, array $filter = [], array $columns = ['*'])
    {
        return $this->model->where($filter)->paginate($perPage, $columns);
    }


    /**
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {

        return $this->model->create($data);
    }

    /**
     * @param int $id
     * @return Model|null
     */
    public function find(int $id): ?Model
    {
        return $this->model->find($id);
    }

    /**
     * @param Model $model
     * @param array $data
     * @return Model
     */
    public function update(Model $model, array $data): Model
    {
        $model->update($data);
        return $model;
    }

    /**
     * @param Model $model
     * @return bool|null
     * @throws \Exception
     */
    public function delete(Model $model): ?bool
    {
        return $model->delete();
    }

    /**
     * Get count of models based on optional filters.
     * 
     * @param array $filters Optional filters in the form of ['column' => 'value', ...]
     * @return int Count of models after applying filters.
     */
    public function count(array $filters = []): int
    {
        // Apply filters to the query if any
        $query = $this->model->newQuery();

        foreach ($filters as $column => $value) {
            // Here we handle basic 'where' filters; this can be extended to more complex scenarios
            $query->where($column, $value);
        }

        return $query->count();
    }
}
