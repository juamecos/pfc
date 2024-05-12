<?php

namespace App\Repositories;

use App\Models\Like;


class LikeRepository extends BaseRepository
{
    public function __construct(Like $like)
    {
        parent::__construct($like);
    }

    public function findByUserAndStone($user_id, $stone_id)
    {
        // Use $this->model for consistency with BaseRepository's OOP approach
        return $this->model->where('user_id', $user_id)->where('stone_id', $stone_id)->first();
    }

    public function countByStoneId($stone_id)
    {
        // Uses base method count with a specific filter
        return $this->count(['stone_id' => $stone_id]);
    }

    public function countByUserId($user_id)
    {
        // Uses base method count with a specific filter
        return $this->count(['user_id' => $user_id]);
    }
}
