<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassIcon extends Model
{
    use HasFactory;

    protected $table = 'class_icons';

    public function characters()
    {
        return $this->hasMany(Character::class);
    }
}
