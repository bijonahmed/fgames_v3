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

class RewardCenterSetting extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "rewards_centers_settings";
  
  protected $fillable = [
    'name',
    'thumnail_img',
    'value',
    'status'
  ];
 
 

}
