<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Journal
 *
 * @property int $id
 * @property array $employe
 * @property int $car_id
 * @property string $type_action
 *
 * @property Car $car
 *
 * @package App\Models
 */
class Journal extends Model
{
    use SoftDeletes;

	protected $table = 'journal';
	public $timestamps = false;

	protected $casts = [
		'employe' => 'json',
		'car_id' => 'int'
	];

	protected $fillable = [
		'employe',
		'car_id',
		'type_action'
	];

	public function car()
	{
		return $this->belongsTo(Car::class);
	}
}
