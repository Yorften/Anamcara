<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuildApplication extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "user_id",
        "in_server",
        "server",
        "roster_image",
        "description",
        "experience",
        "play_time",
        "gvg",
        "gve",
        "server_expectations",
        "inquiry_source",
        "additional_info",
        "guild_cooldown",
        "acquaintances",
        "accepted",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
