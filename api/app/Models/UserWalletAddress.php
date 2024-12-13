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

class UserWalletAddress extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "user_wallet_address";
  
  protected $fillable = [
    'user_id',
    'global_user_wall_add_id',
    'name',
    'delete_time',
    'status'
  ];
 

}
