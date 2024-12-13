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

class Videos extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;
  public $table = "videos";
  
  protected $fillable = [
    'id',
    'video_id',
    'category',
    'title',
    'url',
    'thumb_src',
    'thumb_size',
    'keywords',
    'length_sec',
    'length_min',
    'embed',
    'status',
  ];
 


}
