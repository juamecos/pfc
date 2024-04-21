<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Collection;

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
}
