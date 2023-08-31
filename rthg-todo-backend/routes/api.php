<?php

use App\Http\Controllers\TaskListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
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

Route::prefix('v1/tasks')->group(function (){
    Route::get('/complete', [TaskController::class, 'complete']);
    Route::get('/incomplete', [TaskController::class,'incomplete']);
    //The Routes above have to come first.
    Route::apiResource('/tasks', TaskController::class);
});

Route::prefix('v1/task-lists')->group(function (){
    Route::apiResource('/tasks', TaskListController::class);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

