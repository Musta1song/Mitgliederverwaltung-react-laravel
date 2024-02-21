<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\MemberController;


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

Route::prefix('members')->group(function () {
    Route::get('/',[ MemberController::class, 'getAll']);
    Route::post('/',[ MemberController::class, 'store']);
    Route::delete('/{id}',[ MemberController::class, 'destroy']);
    Route::put('/{id}',[ MemberController::class, 'update']);
});