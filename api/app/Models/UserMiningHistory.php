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

class UserMiningHistory extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "user_mining_history";
  
  protected $fillable = [
    'user_id',
    'boost_mining_id',
    'mining_category_id',
    'mining_per_seconds',
    'name',
    'level_cost'
  ];
 
  
}
