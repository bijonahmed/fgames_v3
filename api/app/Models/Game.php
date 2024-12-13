<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $table = 'request_games'; // Specify the table name
    protected $fillable = ['userid','gameid', 'token', 'lang', 'uname','nick', 'traceId', 'sign','app_id', 'cid'];
}


