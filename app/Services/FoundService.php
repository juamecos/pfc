<?php

namespace App\Services;

use App\Models\Found;
use App\Repositories\FoundRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FoundService extends BaseService
{

    protected $repository;
    /**
     * FoundService constructor.
     * @param FoundRepository $repository
     */
    public function __construct(FoundRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Get all Found entries with their related Stone and User data.
     * 
     * @param int|null $perPage The number of records per page (null for all records).
     * @param array $filter Optional filters to apply on the Found entries.
     * @return LengthAwarePaginator
     */
    public function getAllWithRelations(int $perPage = null, array $filter = []): LengthAwarePaginator
    {
        return $this->handleOperations(fn() => $this->repository->getAllWithRelations($perPage, $filter), __METHOD__);
    }
}
