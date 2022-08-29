<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Billing
 *
 * @property int $id
 * @property int $car_id
 * @property float $amount
 * @property array|null $parking_times
 * @property string $status
 * @property float $total_minutes
 *
 * @property Car $car
 * @property Collection|Payment[] $payments
 *
 * @package App\Models
 */
class Billing extends Model
{
    use SoftDeletes;

	protected $table = 'billing';
	public $timestamps = true;

	protected $casts = [
		'car_id' => 'int',
		'amount' => 'float',
		'parking_times' => 'json',
		'total_minutes' => 'float'
	];

	protected $fillable = [
		'car_id',
		'amount',
		'parking_times',
		'status',
		'total_minutes'
	];

	public function car()
	{
		return $this->belongsTo(Car::class);
	}

	public function payments()
	{
		return $this->hasMany(Payment::class, 'bill_id');
	}
}
