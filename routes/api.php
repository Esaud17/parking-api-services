<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\V1\CarsController ;
use App\Http\Controllers\Api\V1\CarTypesController ;
use App\Http\Controllers\Api\V1\JournalsController ;
use App\Http\Controllers\Api\V1\ParkingTimesController ;
use App\Http\Controllers\Api\V1\BillingsController ;
use App\Http\Controllers\Api\V1\PaymentsController ;

Route::apiResource('v1/cars', CarsController::class);
Route::apiResource('v1/car/types', CarTypesController::class);
Route::apiResource('v1/journals', JournalsController::class);
Route::apiResource('v1/parking/times', ParkingTimesController::class);
Route::apiResource('v1/billing', BillingsController::class);
Route::apiResource('v1/payments', PaymentsController::class);

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


//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
