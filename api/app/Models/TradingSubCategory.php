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

class TradingSubCategory extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "trading_subcategory";
  protected $fillable = [
    'name',
    'slug',
    'category_id',
    'trading_amunt',
    'min_trade',
    'trading_fee',
    'thumnail_img',
    'selected_graph',
    'status',
  ];
 
  
}
