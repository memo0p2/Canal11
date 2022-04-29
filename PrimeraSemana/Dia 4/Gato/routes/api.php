<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\GatoController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', HomeController::class);

Route::get('gato',[GatoController::class,'create']);

Route::get('gato/{user}/{lugar}',[GatoController::class,'move']);

Route::get('obtener/{auxi}',[GatoController::class,'obtener']);

Route::get('gato/nuevo',[GatoController::class,'nuevo']);
