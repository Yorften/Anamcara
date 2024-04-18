<?php

namespace App\Models;

use App\Models\Role;
use App\Traits\UserHasRoles;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, UserHasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'username',
        'global_name',
        'avatar',
        'refresh_token',
        'nick',
        'joined_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'remember_token',
    ];

    public function assignRole($name)
    {
        try {
            $role = Role::where('name', $name)->firstOrFail();
            $this->roles()->attach($role->id);
        } catch (\Exception $e) {
            return 'error: ' . $e->getMessage();
        }
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
