<?php

namespace App\Repositories;

use App\Models\Comment;

class CommentRepository extends BaseRepository
{
    protected $commentRepository;
    /**
     * CommentRepository constructor.
     * Initializes with Comment model.
     *
     * @param Comment $comment
     */
    public function __construct(Comment $comment)
    {
        parent::__construct($comment);
    }
}
