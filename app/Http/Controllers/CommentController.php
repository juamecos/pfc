<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;

use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use App\Models\Stone;
use App\Services\CommentService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

/**
 * Class CommentController
 * @package App\Http\Controllers
 * Controller for managing Comment resources.
 */
class CommentController extends BaseController
{
    protected $commentService;
    /**
     * CommentController constructor.
     * @param CommentService $commentService
     */
    public function __construct(CommentService $commentService)
    {
        parent::__construct($commentService);
        $this->commentService = $commentService;
    }

    // /**
    //  * Display a listing of comments.
    //  *
    //  * @param Request $request
    //  * @return \Inertia\Response
    //  */
    // public function index(Request $request)
    // {
    //     $perPage = $request->input('perPage', 20);

    //     try {
    //         $comments = $this->service->getAll();

    //         return $this->render('Comments/Index', [
    //             'comments' => $comments
    //         ]);
    //     } catch (Exception $e) {
    //         return $this->render('Error', ['message' => $e->getMessage()]);
    //     }
    // }

    /**
     * Display comments filtered by stone ID.
     *
     * @param Request $request
     * @param int $stoneId
     * @return  
     */
    // App\Http\Controllers\CommentController.php
    public function getActiveCommentsByStoneId(Request $request, $stoneId)
    {
        // dd($request);
        $perPage = $request->input('perPage', 20);

        try {
            $comments = $this->commentService->getActiveCommentsByStoneId($perPage, $stoneId);
            return Inertia::render('Comments/ByStone', [
                'comments' => $comments,
                'stoneId' => $stoneId,

            ]);
        } catch (Exception $e) {
            return Inertia::render('Error', ['message' => $e->getMessage()]);
        }
    }

    public function fetchActiveCommentsByStoneId(Request $request, $stoneId)
    {
        $perPage = $request->input('perPage', 20);

        try {
            $comments = $this->commentService->getActiveCommentsByStoneId($perPage, $stoneId);
            return response()->json([
                'success' => true,
                'comments' => $comments,
                'stoneId' => $stoneId,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }


    /**
     * Store a newly created comment.
     *
     * @param StoreCommentRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */

    public function store(StoreCommentRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        try {
            $this->service->save($data);
            return redirect()->back()->with('success', 'Comment added successfully!');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Update the specified comment in storage.
     *
     * @param UpdateCommentRequest $request
     * @param Comment $comment
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateCommentRequest $request, $commentId): RedirectResponse
    {


        $data = $request->validated();

        $comment = Comment::findOrFail($commentId);

        try {
            $this->service->update($comment, $data);


            return redirect()->route('stones.show', ["stoneId" => strval($comment->stone_id)])->with('success', 'Comment edited successfully!');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified comment from storage.
     *
     * @param int $commentId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($commentId)
    {
        try {
            // Buscar el comentario por ID
            $comment = Comment::findOrFail($commentId);

            // Llamar al método delete en el servicio pasando el modelo de comentario
            $this->commentService->delete($comment);

            return redirect()->route('stones.show', ["stoneId" => strval($comment->stone_id)])->with('success', 'Comment deleted successfully!');
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Comment not found.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }



    /**
     * Report a comment to mark it for moderation.
     *
     * @param int $id
     * @return RedirectResponse
     */
    public function report($commentId): RedirectResponse
    {
        try {

            $comment = Comment::findOrFail($commentId);

            $this->commentService->report($commentId);
            return redirect()->route('stones.show', ["stoneId" => strval($comment->stone_id)])->with('success', 'Comment reported successfully!');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    // /**
    //  * Display comments filtered by user ID.
    //  *
    //  * @param Request $request
    //  * @param int $userId
    //  * @return \Inertia\Response
    //  */
    // public function getCommentsByUserId(Request $request, int $userId)
    // {
    //     $perPage = $request->input('perPage', 20);

    //     try {
    //         $comments = $this->service->getCommentsByUserId($perPage, $userId);

    //         return $this->render('Comments/ByUser', [
    //             'comments' => $comments,
    //             'userId' => $userId
    //         ]);
    //     } catch (Exception $e) {
    //         return $this->render('Error', ['message' => $e->getMessage()]);
    //     }
    // }

    // /**
    //  * Display comments filtered by moderation status.
    //  *
    //  * @param Request $request
    //  * @param string $status
    //  * @return \Inertia\Response
    //  */
    // public function getCommentsByStatus(Request $request, string $status)
    // {
    //     $perPage = $request->input('perPage', 20);

    //     try {
    //         $comments = $this->service->getCommentsByStatus($perPage, $status);

    //         return $this->render('Comments/ByStatus', [
    //             'comments' => $comments,
    //             'status' => $status
    //         ]);
    //     } catch (Exception $e) {
    //         return $this->render('Error', ['message' => $e->getMessage()]);
    //     }
    // }

    // /**
    //  * Show the form for creating a new comment.
    //  *
    //  * @return \Inertia\Response
    //  */
    // public function create()
    // {
    //     return $this->render('Comments/Create', [
    //         'user' => auth()->user()
    //     ]);
    // }

    // /**
    //  * Store a newly created comment in storage.
    //  *
    //  * @param Request $request
    //  * @return RedirectResponse
    //  * @throws ValidationException
    //  */
    // public function store(Request $request): RedirectResponse
    // {
    //     $this->validate($request, [
    //         'stone_id' => 'required|integer|exists:stones,id',
    //         'user_id' => 'required|integer|exists:users,id',
    //         'content' => 'required|string|max:1000'
    //     ]);

    //     $data = $request->only(['stone_id', 'user_id', 'content']);
    //     try {
    //         $this->service->save($data);
    //         return $this->redirect('comments.index')->with('success', 'Comment created successfully!');
    //     } catch (Exception $e) {
    //         return $this->redirect('comments.index')->with('error', $e->getMessage());
    //     }
    // }

    // /**
    //  * Display the specified comment.
    //  *
    //  * @param Comment $comment
    //  * @return \Inertia\Response
    //  */
    // public function show(Comment $comment)
    // {
    //     try {
    //         $commentDetails = $this->service->getById($comment->id);
    //         return $this->render('Comments/Show', ['comment' => $commentDetails]);
    //     } catch (Exception $e) {
    //         return $this->render('Error', ['message' => $e->getMessage()]);
    //     }
    // }

    // /**
    //  * Show the form for editing the specified comment.
    //  *
    //  * @param Comment $comment
    //  * @return \Inertia\Response
    //  */
    // public function edit(Comment $comment)
    // {
    //     return $this->render('Comments/Edit', ['comment' => $comment]);
    // }

    // /**
    //  * Update the specified comment in storage.
    //  *
    //  * @param Request $request
    //  * @param Comment $comment
    //  * @return RedirectResponse
    //  * @throws ValidationException
    //  */
    // public function update(Request $request, Comment $comment)
    // {
    //     $this->validate($request, [
    //         'content' => 'required|string|max:1000'
    //     ]);

    //     $data = $request->only(['content']);
    //     try {
    //         $this->service->update($comment, $data);
    //         return $this->redirect('comments.show', [$comment]);
    //     } catch (Exception $e) {
    //         return $this->redirect('comments.show', [$comment])->with('error', $e->getMessage());
    //     }
    // }

    // /**
    //  * Remove the specified comment from storage.
    //  *
    //  * @param Comment $comment
    //  * @return RedirectResponse
    //  */
    // public function destroy(Comment $comment)
    // {
    //     try {
    //         $this->service->delete($comment);
    //         return $this->redirect('comments.index')->with('success', 'Comment deleted successfully!');
    //     } catch (Exception $e) {
    //         return $this->redirect('comments.index')->with('error', $e->getMessage());
    //     }
    // }

    // /**
    //  * Report a comment to mark it for moderation.
    //  *
    //  * @param int $id
    //  * @return RedirectResponse
    //  */
    // public function report(int $id): RedirectResponse
    // {
    //     try {
    //         $this->service->reportComment($id);
    //         return $this->redirect('comments.index')->with('success', 'Comment reported successfully!');
    //     } catch (Exception $e) {
    //         return $this->redirect('comments.index')->with('error', $e->getMessage());
    //     }
    // }

    // /**
    //  * Moderate a comment based on action and reason.
    //  *
    //  * @param Request $request
    //  * @param int $id
    //  * @return RedirectResponse
    //  * @throws ValidationException
    //  */
    // public function moderate(Request $request, int $id): RedirectResponse
    // {
    //     $this->validate($request, [
    //         'action' => 'required|string|in:approved,rejected',
    //         'reason' => 'required|string|max:255'
    //     ]);

    //     $action = $request->input('action');
    //     $reason = $request->input('reason');

    //     try {
    //         $this->service->moderateComment($id, $action, $reason);
    //         return $this->redirect('comments.index')->with('success', 'Comment moderated successfully!');
    //     } catch (Exception $e) {
    //         return $this->redirect('comments.index')->with('error', $e->getMessage());
    //     }
    // }
}
