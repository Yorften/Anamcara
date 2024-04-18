<?php

namespace App\Traits;

use App\Models\Role;

trait UserHasRoles
{
    public function hasRole($role)
    {
        return $this->roles()->where('name', $role)->exists();
    }

    public function hasRoles($roles)
    {
        foreach ($roles as $role) {
            if (!$this->hasRole($role)) {
                return false;
            }
        }
        return true;
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}
