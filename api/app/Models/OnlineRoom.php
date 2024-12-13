<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnlineRoom extends Model
{
    use HasFactory;

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
        'num_followers',
        'country',
        'spoken_languages',
        'display_name',
        'birthday',
        'is_hd',
        'age',
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
        'status'
    ];

    protected $casts = [
        'tags' => 'array',
        'birthday' => 'date',
        'is_new' => 'boolean',
        'is_hd' => 'boolean',
        'recorded' => 'boolean',
    ];
}
