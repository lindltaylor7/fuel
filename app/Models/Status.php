<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $fillable = ['vehicle_id', 'fuel', 'water', 'cleaning', 'shift', 'comments'];

    /**
     * Get the vehicle that owns the marking.
     */
    public function vehicle()
    {
        return $this->belongsTo('App\Models\Vehicle', 'vehicle_id');
    }
}
