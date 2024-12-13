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

class MiningBalanceSum extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "user_mining_log";
  
  protected $fillable = [
    'user_id',
    'mining_cat_id',
    'ocn_balance',
  ];
 
 

}
