<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CarType
 * 
 * @property int $id
 * @property string|null $car_type
 * @property string|null $description
 * 
 * @property Collection|Car[] $cars
 *
 * @package App\Models
 */
class CarType extends Model
{
	protected $table = 'car_types';
	public $timestamps = false;

	protected $fillable = [
		'car_type',
		'description'
	];

	public function cars()
	{
		return $this->hasMany(Car::class);
	}
}
