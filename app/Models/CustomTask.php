<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'frequency',
        'repetition',
        'ilvl',
        'icon_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function icon()
    {
        return $this->belongsTo(Icon::class);
    }

    public function characters()
    {
        return $this->belongsToMany(Character::class);
    }
}
