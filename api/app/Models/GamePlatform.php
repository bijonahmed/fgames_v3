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

class GamePlatform extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "game_platform";
  
  protected $fillable = [
    'name',
    'status',
    'slug',
    'game_type_id',
    'image',
    'status'
  ];
 

}
