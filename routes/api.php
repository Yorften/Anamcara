<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\GuildApplicationController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Route::apiResource('/roles', RoleController::class);

Route::post('/auth/discord/callback', [AuthController::class, 'callback']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users/@me', [UserController::class, 'show']);
    Route::get('/users/@me/guild', [UserController::class, 'guild']);
    Route::get('/users/roles', [UserController::class, 'updateUserRoles']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/images', GalleryController::class);
    Route::apiResource('/videos', VideoController::class);  

    Route::middleware(['role:Officer Team'])->group(function () {
        Route::get('/applications/history', [GuildApplicationController::class, 'history']);
        Route::post('/roles/sync', [RoleController::class, 'sync']);
        Route::apiResource('/applications', GuildApplicationController::class);

    });
});
