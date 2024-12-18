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

class GameList extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "api_gamelist";

  protected $fillable = [
    'platType',
    'gameType',
    'gameTypeName',
    'gameCode',
    'ingress',
    'ingressStatus',
    'gameName_zh_hant',
    'gameName_zh_hans',
    'gameName_en',
    'gameid',
    'name',
    'slug',
    'game_images',
    'platform_id',
    'gametype_id',
    'status',
];
 
 

}
