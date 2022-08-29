<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\ParkingTime;
use App\Models\Car;
use Illuminate\Http\Request;

use Carbon\Carbon;

class ParkingTimesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  ParkingTime::All()->where('status','pending');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $car = Car::where('plate', $data["plate"])->first();
        $pending = ParkingTime::where(['status'=> 'pending' , 'car_id'=> $car->id])->get();
        if(count($pending) > 0 ){
            return response()->json(["status"=>"error","action"=>$pending], 403);
        }

        $data["car_id"] = $car->id;
        $data["total_minutes"] =  0;
        $data["car_entry"] =  Carbon::now();
        $data["status"] = 'pending';

        $parkingTime = ParkingTime::create($data);
        return response()->json($parkingTime, 201);
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
