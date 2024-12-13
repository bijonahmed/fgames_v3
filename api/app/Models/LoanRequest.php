<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\AttributeValues;
use AuthorizesRequests;
use DB;

class LoanRequest extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "loan_request";
  
  protected $fillable = [
    'user_id',
    'loan_id',
    'loan_value',
    'status',
  ];
 
 

}
