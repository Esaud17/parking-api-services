<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CarTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('car_types')->insert([
            'car_type' => "official",
            'description' => 'Oficial',
            'created_at' => Carbon::now(),
            'rate' => 0
        ]);

        DB::table('car_types')->insert([
            'car_type' => "resident",
            'description' => 'Residente',
            'created_at' => Carbon::now(),
            'rate' => 0.05
        ]);

         DB::table('car_types')->insert([
            'car_type' => "other",
            'description' => 'Residente',
            'created_at' => Carbon::now(),
            'rate' => 0.50
        ]);
    }
}
