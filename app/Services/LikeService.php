<?php

namespace App\Services;

use App\Models\Like;
use App\Repositories\LikeRepository;

class LikeService extends BaseService
{

    protected $likeRepository;

    /**
     * LikeService constructor.
     * @param LikeRepository $likeRepository
     */
    public function __construct(LikeRepository $likeRepository)
    {
        $this->likeRepository = $likeRepository;
    }

    public function toggleLike($user_id, $stone_id)
    {
        $like = $this->likeRepository->findByUserAndStone($user_id, $stone_id);

        if ($like) {

            if ($like->user_id == $user_id) {
                return $this->likeRepository->delete($like);
            }

        } else {
            return $this->likeRepository->create([
                'user_id' => $user_id,
                'stone_id' => $stone_id
            ]);
        }
    }

    public function countByStoneId($stone_id)
    {
        return $this->likeRepository->countByStoneId($stone_id);
    }

    public function countByUserId($user_id)
    {
        return $this->likeRepository->countByUserId($user_id);
    }
}