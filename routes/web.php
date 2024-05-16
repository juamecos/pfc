<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FoundController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StoneController;
use App\Http\Controllers\UserController;
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
    return Inertia::location('/');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', [StoneController::class, 'index']);

Route::get('/stone', [StoneController::class, 'index'])->name('stone.index');
Route::get('/stone/create', [StoneController::class, 'create'])->name('stone.create');
Route::post('/stone', [StoneController::class, 'store'])->name('stone.store');
Route::get('/stone/{stone}', [StoneController::class, 'show'])->name('stone.show');
Route::get('/stone/{stone}/edit', [StoneController::class, 'edit'])->name('stone.edit');
Route::put('/stone/{stone}', [StoneController::class, 'update'])->name('stone.update');
Route::patch('/stone/{stone}', [StoneController::class, 'update'])->name('stone.update');
Route::delete('/stone/{stone}', [StoneController::class, 'destroy'])->name('stone.destroy');
Route::get('/stone/create', [StoneController::class, 'create'])->name('stone.create');
Route::post('/stone', [StoneController::class, 'store'])->name('stone.store');
Route::get('/stones/{stone}', [StoneController::class, 'show'])->name('stones.show');
Route::put('stones/{stoneId}', [StoneController::class, 'report'])->name('stone.report');
Route::get('stone/check/{code}', [StoneController::class, 'findStoneByCode'])->name('stone.check');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::get('/stone/create', [StoneController::class, 'create'])->name('stone.create');
});

Route::get('/discover', [StoneController::class, 'discover'])->name('stones.discover');



Route::post('comments', [CommentController::class, 'store'])->name('comments.store');
Route::delete('comments/{commentId}', [CommentController::class, 'destroy'])->name('comments.destroy');
Route::put('comments/{commentId}', [CommentController::class, 'report'])->name('comments.report');

Route::patch('comments/{commentId}', [CommentController::class, 'update'])->name('comments.update');

Route::get('comments/stone/{stoneId}', [CommentController::class, 'getActiveCommentsByStoneId'])->name('comments.byStone');


Route::get('comments/stone/{stoneId}/fetch', [CommentController::class, 'fetchActiveCommentsByStoneId'])->name('comments.byStone.fetch');


Route::post('/likes/toggle', [LikeController::class, 'toggle'])->name('likes.toggle');

Route::get('/founds/create', [FoundController::class, 'create'])->name('founds.create');
Route::post('/founds/create', [FoundController::class, 'create'])->name('founds.create');

Route::post('/founds/store', [FoundController::class, 'store'])->name('found.store');

Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('users.index');
    Route::get('create', [UserController::class, 'create'])->name('users.create');
    Route::post('/', [UserController::class, 'store'])->name('users.store');
    Route::get('{id}', [UserController::class, 'show'])->name('users.show');
    Route::get('{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('{id}', [UserController::class, 'destroy'])->name('users.destroy');
});



require __DIR__ . '/auth.php';
