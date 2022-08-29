<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParkingTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parking_times', function (Blueprint $table) {
            $table->bigInteger('id', true);
            $table->bigInteger('car_id')->index('parking_time_FK');
            $table->double('total_minutes')->nullable();
            $table->enum('status', ['process', 'finished', 'pending', 'close']);
            $table->dateTime('car_entry');
            $table->dateTime('car_out')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parking_times');
    }
}
