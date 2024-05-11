<?php

namespace App\Services;


use App\Repositories\CommentRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CommentService extends BaseService
{

    protected $commentRepository;
    /**
     * CommentService constructor.
     * @param CommentRepository $commentRepository
     */
    public function __construct(CommentRepository $commentRepository)
    {

        parent::__construct($commentRepository);
        $this->commentRepository = $commentRepository;
    }


    /**
     * Retrieves all active comments for a specific stone.
     * 
     * @param int $stoneId
     * @return LengthAwarePaginator
     */
    // App\Services\CommentService.php
    public function getActiveCommentsByStoneId($perPage, $stoneId): LengthAwarePaginator
    {
        return $this->handleOperations(
            fn() => $this->commentRepository->filteredPagination(
                $perPage,
                ['stone_id' => $stoneId, 'active' => true],
                ['*'],
                ['user']
            ),
            __METHOD__
        );
    }


    /**
     * Retrieves all comments by user id.
     * 
     * @param int $userId
     * @return mixed
     */
    public function getCommentsByUserId($perPage, $userId)
    {
        return $this->handleOperations(fn() => $this->$commentRepository->filteredPagination($perPage, ['user_id' => $userId]), __METHOD__);
    }

    /**
     * Retrieves all comments by moderation status.
     * 
     * @param string $status
     * @return mixed
     */
    public function getCommentsByStatus($perPage, $status)
    {
        return $this->handleOperations(fn() => $this->$commentRepository->filteredPagination($perPage, ['moderation_status' => $status]), __METHOD__);
    }

    /**
     * Reports a comment increasing its report count and setting its status to pending.
     * 
     * @param int $commentId
     * @return mixed
     */
    public function report($commentId)
    {
        $comment = $this->commentRepository->find($commentId);
        if ($comment) {
            return $this->handleOperations(fn() => $comment->report(), __METHOD__);
        }
        throw new \Exception("Comment not found with ID: $commentId");
    }



    // /**
    //  * Moderates a comment based on action and reason.
    //  * 
    //  * @param int $commentId
    //  * @param string $action
    //  * @param string $reason
    //  * @return mixed
    //  */
    // public function moderateComment($commentId, $action, $reason)
    // {
    //     $comment = $this->$commentRepository->find($commentId);
    //     if ($comment) {
    //         return $this->handleOperations(fn() => $comment->moderate($action, $reason), __METHOD__);
    //     }
    //     throw new \Exception("Comment not found with ID: $commentId");
    // }
}
