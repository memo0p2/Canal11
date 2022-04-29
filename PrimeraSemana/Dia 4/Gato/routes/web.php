<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\GatoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', HomeController::class);

Route::get('gato',[GatoController::class,'create']);

Route::get('gato/{user}/{lugar}',[GatoController::class,'move']);

Route::get('gato/obtener/{idUser}',[GatoController::class,'obtener']);

Route::get('gato/nuevo',[GatoController::class,'nuevo']);




