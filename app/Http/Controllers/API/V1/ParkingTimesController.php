<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\ParkingTime;
use Illuminate\Http\Request;

class ParkingTimesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ParkingTime  $parkingTime
     * @return \Illuminate\Http\Response
     */
    public function show(ParkingTime $parkingTime)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ParkingTime  $parkingTime
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ParkingTime $parkingTime)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ParkingTime  $parkingTime
     * @return \Illuminate\Http\Response
     */
    public function destroy(ParkingTime $parkingTime)
    {
        //
    }
}
