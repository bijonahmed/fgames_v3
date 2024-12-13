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

class UserBotHistory extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "user_bot_history";
  
  protected $fillable = [
    'user_id',
    'boost_setting_id',
    'mining_category_id',
    'name',
    'hours',
    'level_cost'
  ];
 
  
}
