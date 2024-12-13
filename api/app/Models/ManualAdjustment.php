<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManualAdjustment extends Model
{
    use HasFactory;
   
    public $table = "manual_adjustment";
    protected $fillable = ['user_id', 'adjustment_type','adjustment_amount','detailed_remarks'];
    
}

