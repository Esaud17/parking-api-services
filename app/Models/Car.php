<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Car
 * 
 * @property int $id
 * @property string $plate
 * @property int $car_type_id
 * @property array|null $info
 * @property string $uuid
 * 
 * @property CarType $car_type
 * @property Collection|Billing[] $billings
 * @property Collection|Journal[] $journals
 * @property Collection|ParkingTime[] $parking_times
 * @property Collection|Payment[] $payments
 *
 * @package App\Models
 */
class Car extends Model
{
	protected $table = 'cars';
	public $timestamps = false;

	protected $casts = [
		'car_type_id' => 'int',
		'info' => 'json'
	];

	protected $fillable = [
		'plate',
		'car_type_id',
		'info',
		'uuid'
	];

	public function car_type()
	{
		return $this->belongsTo(CarType::class);
	}

	public function billings()
	{
		return $this->hasMany(Billing::class);
	}

	public function journals()
	{
		return $this->hasMany(Journal::class);
	}

	public function parking_times()
	{
		return $this->hasMany(ParkingTime::class);
	}

	public function payments()
	{
		return $this->hasMany(Payment::class);
	}
}
