<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fluid extends Model
{
    use HasFactory;

    protected $fillable = ['vehicle_id', 'refrigerant', 'compressor', 'engine', 'hydraulic', 'shift', 'comments'];

    /**
     * Get the vehicle that owns the marking.
     */
    public function vehicle()
    {



        return $this->belongsTo('App\Models\Vehicle', 'vehicle_id');
    }
}
