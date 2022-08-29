<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Payment
 * 
 * @property int $id
 * @property int $car_id
 * @property int $bill_id
 * @property float $amount
 * @property string $type_payment
 * @property array $employe
 * 
 * @property Car $car
 * @property Billing $billing
 *
 * @package App\Models
 */
class Payment extends Model
{
	protected $table = 'payments';
	public $timestamps = false;

	protected $casts = [
		'car_id' => 'int',
		'bill_id' => 'int',
		'amount' => 'float',
		'employe' => 'json'
	];

	protected $fillable = [
		'car_id',
		'bill_id',
		'amount',
		'type_payment',
		'employe'
	];

	public function car()
	{
		return $this->belongsTo(Car::class);
	}

	public function billing()
	{
		return $this->belongsTo(Billing::class, 'bill_id');
	}
}
