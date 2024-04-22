<?php

namespace App\Services;

use Exception;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\HttpClientException;

class RoleService
{
    public function updateAppRoles()
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bot ' . env('DISCORD_APPLICATION_TOKEN'),
                'Content-Type' => 'application/x-www-form-urlencoded',
            ])->get('https://discord.com/api/guilds/' . env('DISCORD_GUILD_ID') . '/roles');

            $discordRoles = $response->throw()->json();

            $dbRoles = Role::all()->keyBy('id');

            foreach ($discordRoles as $discordRole) {
                $roleData = [
                    'name' => $discordRole['name'],
                ];

                $dbRole = $dbRoles->get($discordRole['id']);

                if ($dbRole) {
                    $dbRole->update($roleData);
                } else {
                    Role::create(array_merge(['id' => $discordRole['id']], $roleData));
                }
            }
        } catch (HttpClientException $e) {
            Log::error('HTTP Client Exception: ' . $e->getMessage());
            throw $e;
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            throw $e;
        }
    }

    public function updateUserRoles(User $user, $user_roles)
    {
        $guild_roles = Role::pluck('id')->toArray();

        $valid_roles = array_intersect($user_roles, $guild_roles);


        if ($user->roles()->exists()) {

            $currentRoles = $user->roles()->pluck('roles.id')->toArray();

            $rolesToAttach = array_diff($valid_roles, $currentRoles);

            $rolesToDetach = array_diff($currentRoles, $valid_roles);

            $user->roles()->attach($rolesToAttach);

            $user->roles()->detach($rolesToDetach);
        } else {
            $user->roles()->attach($valid_roles);
        }
    }

    public function getUserRoles($ids)
    {
        $user_roles_with_names = [];
        foreach ($ids as $role_id) {
            $role = Role::find($role_id);
            if ($role) {
                $user_roles_with_names[] = [
                    'id' => $role_id,
                    'name' => $role->name,
                ];
            }
        }
        return $user_roles_with_names;
    }
}
