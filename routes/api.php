<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Registration\UserController;
use App\Http\Controllers\Registration\DistrictController;
use App\Http\Controllers\Registration\EstateController;
use App\Http\Controllers\ISFsController;
use App\Http\Controllers\AwardeeController;
use App\Http\Controllers\ActivityController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('forgot', [AuthController::class, 'forgot']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::resource('user', UserController::class);
    Route::resource('district', DistrictController::class);
    Route::resource('estate', EstateController::class);
    Route::resource('isf', ISFsController::class);
    Route::resource('awardee', AwardeeController::class);
    Route::resource('activity', ActivityController::class);
    Route::get('profile', [AuthController::class, 'profile']);
    Route::get('logout', [AuthController::class, 'logout']);
});
