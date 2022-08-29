<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ParkingTime
 * 
 * @property int $id
 * @property int $car_id
 * @property float $total_minutes
 * @property string $status
 * @property Carbon $car_entry
 * @property Carbon $car_out
 * 
 * @property Car $car
 *
 * @package App\Models
 */
class ParkingTime extends Model
{
	protected $table = 'parking_times';
	public $timestamps = false;

	protected $casts = [
		'car_id' => 'int',
		'total_minutes' => 'float'
	];

	protected $dates = [
		'car_entry',
		'car_out'
	];

	protected $fillable = [
		'car_id',
		'total_minutes',
		'status',
		'car_entry',
		'car_out'
	];

	public function car()
	{
		return $this->belongsTo(Car::class);
	}
}
