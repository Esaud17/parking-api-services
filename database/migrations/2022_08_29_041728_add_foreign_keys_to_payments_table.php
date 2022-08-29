<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->foreign(['car_id'], 'payments_FK')->references(['id'])->on('cars')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['bill_id'], 'payments_FK_1')->references(['id'])->on('billing')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign('payments_FK');
            $table->dropForeign('payments_FK_1');
        });
    }
}
