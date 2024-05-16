<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Awardee extends Model
{
    use HasFactory;
    protected $table = 'awardees';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'estate',
        'members',
        'amortization',
        'arrears',
        'remarks',
        'entitlement'
    ];
}
