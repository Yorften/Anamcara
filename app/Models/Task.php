<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public function icon()
    {
        return $this->belongsTo(Icon::class);
    }

    public function characters()
    {
        return $this->belongsToMany(Character::class);
    }
}
