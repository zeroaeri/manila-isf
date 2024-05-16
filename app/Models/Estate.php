<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estate extends Model
{
    use HasFactory;
    protected $table = 'estates';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'housingQuan',
        'status',
        'address',
        'brgy',
        'zone',
        'district',
        'sqm',
    ];
}
