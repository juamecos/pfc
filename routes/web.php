<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoneController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', [StoneController::class, 'index']);

Route::resource('/stone', StoneController::class);
Route::get('/stones/{stone}', [StoneController::class, 'show'])->name('stones.show');
Route::put('stones/{stoneId}', [StoneController::class, 'report'])->name('stone.report');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/discover', [StoneController::class, 'discover'])->name('stones.discover');

// Route::resource('comments/', CommentController::class);

Route::post('comments', [CommentController::class, 'store'])->name('comments.store');
Route::delete('comments/{commentId}', [CommentController::class, 'destroy'])->name('comments.destroy');
Route::put('comments/{commentId}', [CommentController::class, 'report'])->name('comments.report');

Route::patch('comments/{commentId}', [CommentController::class, 'update'])->name('comments.update');

Route::get('comments/stone/{stoneId}', [CommentController::class, 'getActiveCommentsByStoneId'])->name('comments.byStone');


Route::get('comments/stone/{stoneId}/fetch', [CommentController::class, 'fetchActiveCommentsByStoneId'])->name('comments.byStone.fetch');


Route::post('/likes/toggle', [LikeController::class, 'toggle'])->name('likes.toggle');

/**
 * Group routes that require user authentication and email verification.
 *
 * This routing group ensures that all included routes are only accessible to users who are authenticated
 * and have verified their email addresses. It applies these constraints to three resource controllers,
 * handling CRUD operations for likes, comments, and found items. Each resource controller is mapped to 
 * standard CRUD operations according to Laravel's resource routing conventions.
 *
 * @see \App\Http\Controllers\LikeController Handles CRUD operations for likes
 * @see \App\Http\Controllers\CommentController Handles CRUD operations for comments
 * @see \App\Http\Controllers\FoundController Handles CRUD operations for found items
 * @middleware auth Ensures the user is authenticated before accessing these routes
 * @middleware verified Ensures the user has a verified email before accessing these routes
 */
// Route::middleware(['auth','verified'])->group(function () {
//     Route::post('stone/create', fn() => Inertia::render('Stone/Create'))->name('create');
//     Route::put('stone/{stone}/edit', fn($stone) => Inertia::render('Stone/Edit', ['stoneId' => $stone]))->name('stone.update');
//     Route::delete('stone/{stone}', [StoneController::class, 'destroy'])->name('stone.delete');
//     Route::resource('like', LikeController::class);
//     Route::resource('comment', CommentController::class);
//     Route::resource('found', FoundController::class);
// });

require __DIR__ . '/auth.php';
