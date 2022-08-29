<?php

namespace App\Exports;

use App\Models\Billing;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BillingExport implements FromQuery, WithHeadings
{

    use Exportable;

    public function query()
    {
        return Billing::join('cars', 'billing.car_id', '=', 'cars.id')->where(['status' =>'building'])->select(['cars.plate' , 'billing.total_minutes', 'billing.amount']);
    }

    public function headings(): array
    {
        return ["Num. placa", "Tiempo estacionado (min.)", "Cantidad a pagar"];
    }
}
