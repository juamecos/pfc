<?php

namespace App\Services;

use App\Models\ModerationLog;
use App\Repositories\ModerationLogRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ModerationLogService extends BaseService
{

    protected $repository;
    /**
     * ModerationLogService constructor.
     *
     * @param ModerationLogRepository $repository
     */
    public function __construct(ModerationLogRepository $repository)
    {
        parent::__construct($repository);
    }

    /**
     * Retrieve moderation logs for a specific moderatable entity.
     *
     * @param string $type The type of the moderatable entity.
     * @param int $id The ID of the moderatable entity.
     * @param int|null $perPage The number of records per page (null for all records).
     * @param array $columns The columns to select from the model.
     * @return LengthAwarePaginator
     */
    public function getLogsForModeratable(string $type, int $id, int $perPage = null, array $columns = ['*']): LengthAwarePaginator
    {
        return $this->handleOperations(fn() => $this->repository->getLogsForModeratable($type, $id, $perPage, $columns), __METHOD__);
    }

    /**
     * Retrieve moderation logs for a specific user.
     *
     * @param int $userId The ID of the user who performed the action.
     * @param int|null $perPage The number of records per page (null for all records).
     * @param array $columns The columns to select from the model.
     * @return LengthAwarePaginator
     */
    public function getLogsByUser(int $userId, int $perPage = null, array $columns = ['*']): LengthAwarePaginator
    {
        return $this->handleOperations(fn() => $this->repository->getLogsByUser($userId, $perPage, $columns), __METHOD__);
    }
}
