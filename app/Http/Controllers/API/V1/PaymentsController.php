<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;


use App\Models\ParkingTime;
use App\Models\Billing;

use App\Exports\BillingExport;
use Maatwebsite\Excel\Facades\Excel;

use Carbon\Carbon;

class PaymentsController extends Controller
{


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $file = $data["file"].'.xlsx';

        return  Excel::download(new BillingExport, $file);
    }


}
