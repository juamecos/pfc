<?php

namespace App\Repositories;

use App\Models\ModerationLog;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Class ModerationLogRepository
 * @package App\Repositories
 */
class ModerationLogRepository extends BaseRepository
{
    /**
     * ModerationLogRepository constructor.
     *
     * @param ModerationLog $model
     */
    public function __construct(ModerationLog $model)
    {
        parent::__construct($model);
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
        $filter = [
            'moderatable_type' => $type,
            'moderatable_id' => $id,
        ];

        return $this->filteredPagination($perPage, $filter, $columns);
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
        $filter = [
            'action_by' => $userId,
        ];

        return $this->filteredPagination($perPage, $filter, $columns);
    }
}