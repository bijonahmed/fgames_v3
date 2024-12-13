<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use AuthorizesRequests;
use DB;

class Chaturbateapi extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public $table = "chaturbate_api";
    protected $fillable = [
        'gender',
        'location',
        'current_show',
        'username',
        'room_subject',
        'tags',
        'is_new',
        'num_users',
        'country',
        'spoken_languages',
        'spoken_languages',
        'display_name',
        'birthday',
        'is_hd',
        'seconds_online',
        'image_url',
        'image_url_360x270',
        'chat_room_url_revshare',
        'iframe_embed_revshare',
        'chat_room_url',
        'iframe_embed',
        'block_from_countries',
        'block_from_states',
        'recorded',
        'slug',
        'type',
        'status',
    ];
}
