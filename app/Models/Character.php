<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'note',
        'ilvl',
        'class_icon_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function icon()
    {
        return $this->belongsTo(ClassIcon::class);
    }

    public function assignedTasks()
    {
        return $this->belongsToMany(Task::class);
    }

    public function assignedCustomTasks()
    {
        return $this->belongsToMany(CustomTask::class);
    }
}
