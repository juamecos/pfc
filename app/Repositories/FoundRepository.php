<?php

namespace App\Repositories;

use App\Models\Found;

class FoundRepository extends BaseRepository
{
    /**
     * FoundRepository constructor.
     * @param Found $model
     */
    public function __construct(Found $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all Found entries with their related Stone and User data.
     * 
     * @param int $perPage
     * @param array $filter
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getAllWithRelations($perPage = null, array $filter = [])
    {
        return $this->model->with(['stone', 'user'])
            ->where($filter)
            ->paginate($perPage);
    }
}
