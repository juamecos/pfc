<?php

namespace App\Http\Controllers;

use App\Services\LikeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LikeController extends Controller
{
    protected $likeService;

    public function __construct(LikeService $likeService)
    {
        $this->likeService = $likeService;
    }

    public function toggle(Request $request)
    {
        $user_id = $request->user_id;
        $stone_id = $request->stone_id;
        $this->likeService->toggleLike($user_id, $stone_id);
        return Inertia::location(request()->headers->get('referer'));
    }
}

