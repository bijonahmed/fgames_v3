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

class GamesListTranslate extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "api_gamelist_transate";
  
  protected $fillable = [
    'name',
    'game_code',
    'language',
    'status',
  ];
  
}
