<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ISFs extends Model
{
    use HasFactory;

    protected $table = 'isfs';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'bday',
        'civilStat',
        'childQuan',
        'incomeBracket',
        'zone',
        'district',
        'brgy',
        'typeLocation',
        'specLocation',
        'imgLoc',
        'descLocation',
    ];
}
