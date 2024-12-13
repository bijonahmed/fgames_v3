<?php
namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use AuthorizesRequests;
use DB;
class HostersModel extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $table = "videos";
    protected $fillable = [
        'video_id',
        'category',
        'id',
        'titile',
        'url',
        'thumb_src',
        'thumb_size',
        'page',
        'keywords',
        'length_sec',
        'length_min',
        'embed',
        'status',
    ];
}
