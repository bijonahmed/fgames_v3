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

class GamesAll extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "api_gamelist";

  protected $fillable = [
    'name',
    'slug',
    'gameid',
    'game_images',
    'gametype_id',
    'platform_id',
    'game_type',
    'status',
    'slug',
    'status',
  ];
}
