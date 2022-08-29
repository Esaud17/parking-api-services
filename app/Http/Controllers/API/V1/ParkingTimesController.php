<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\ParkingTime;
use App\Models\Car;
use App\Models\Billing;
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
        return  ParkingTime::join('cars', 'parking_times.car_id', '=', 'cars.id')->where('status','pending')->get(['cars.*' , 'parking_times.*']);
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
            return response()->json(["status"=>"error","event"=>"El auto tiene un registro de ingreso en el parqueo abierto", "data"=>$pending], 403);
        }

        $data["car_id"] = $car->id;
        $data["total_minutes"] =  0;
        $data["car_entry"] =  Carbon::now();
        $data["status"] = 'pending';

        $parkingTime = ParkingTime::create($data);
        return response()->json($parkingTime, 201);
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
        $result = [];

        $data = $request->all();

        $car = Car::where('plate', $data["plate"])->first();

        $pending = ParkingTime::where(['status'=> 'pending' , 'car_id'=> $car->id])->get();
        if(count($pending) == 0 ){
            return response()->json(["status"=>"error","event"=>"El auto no tiene un registro de ingreso en el parqueo","data"=>null], 403);
        }

        $parking = $pending[0];
        $date =  Carbon::now();

        $difference = date_diff($parking->car_entry,  $date);
        $minutes = ($difference->days * 24 * 60)+($difference->h * 60)+($difference->i);

        $status = ( $car->car_type->car_type == 'official')? 'finished': "process";

        $data =[
            "car_out"=> $date,
            "status"=> $status,
            "total_minutes" =>  $minutes
        ];

        $success = ParkingTime::where(['id' => $parking->id])->update($data);
        $parking = ParkingTime::find($parking->id);

        $result["parking"] = $parking;

        if( $car->car_type->car_type != 'official' ){

            $bill = [];
            $status = 'pending';
            if($car->car_type->car_type == 'resident') {
                $status = 'building';
                $bill = Billing::where(['car_id' =>$car->id, 'status'=>'building'])->get();
            }

            if(count($bill)==0){

                $dataBill = [
                    "car_id" => $car->id,
                    "total_minutes" => $minutes,
                    "status"=> $status,
                    "amount"=> $minutes *  $car->car_type->rate,
                    "parking_times"=> [$parking]
                ];

                if( $dataBill['amount'] <= 0 ){
                    return response()->json(["status"=>"info","event"=>"El monto por concepto de parqueo asciende a 0 ","data"=>$result], 403);
                }

                $billing = Billing::create($dataBill);

                if($car->car_type->car_type == 'other'){
                     $result["bill"] = $billing;
                }
            } else{

                $billing = $bill[0];

                $merge = array_merge($billing->parking_times, [$parking]);
                $billing->parking_times =  $merge;

                $dataBill = [
                    "total_minutes" => ($billing->total_minutes + $minutes),
                    "amount"=>( $billing->amount + ($minutes *  $car->car_type->rate)),
                    "parking_times"=>  $billing->parking_times
                ];

                $success = Billing::where(['id' => $billing->id])->update($dataBill);
            }

        }


        return response()->json($result, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ParkingTime  $parkingTime
     * @return \Illuminate\Http\Response
     */
    public function destroy(ParkingTime $parkingTime)
    {
        $result = [];

        $result["times"] = ParkingTime::where(['status' =>'process'])->orWhere(['status' =>'finished'])->update(['status' =>'close']);
        $result["bill"] =Billing::where(['status' =>'building'])->update(['status' =>'close']);

        return response()->json($result, 201);
    }
}
