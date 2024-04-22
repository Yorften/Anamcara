<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\HttpClientException;
use Illuminate\Support\Facades\Log;

class UserService
{

    public function updateUser(User $user, $payload)
    {
        $user->update($payload);
    }

    public function refreshAccessToken(User $user)
    {
        $payload = [
            'client_id' => env('DISCORD_CLIENT_ID'),
            'client_secret' => env('DISCORD_CLIENT_SECRET'),
            'grant_type' => 'refresh_token',
            'refresh_token' => $user->refresh_token,
        ];

        try {
            $response = Http::asForm()->post('https://discord.com/api/oauth2/token', $payload);
            $result = $response->throw()->json();
            $access_token = $result['access_token'];
            $refresh_token = $result['refresh_token'];
            $this->updateUser($user, ['refresh_token' => $refresh_token]);
            return $access_token;
        } catch (HttpClientException $e) {
            Log::error('HTTP Client Exception: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching user data.' . $e->getMessage()], 500);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'An unexpected error occurred.' . $e->getMessage()], 500);
        }
    }

    public function getUserGuilds(User $user, $access_token = '')
    {
        if (empty($access_token)) {
            $access_token = $this->refreshAccessToken($user);
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $access_token,
                'Content-Type' => 'application/x-www-form-urlencoded',
            ])->get('https://discord.com/api/users/@me/guilds', [
                'after' => '944203277552197672',
                'limit' => 2,
            ]);

            return $response->throw()->json();
        } catch (HttpClientException $e) {
            Log::error('HTTP Client Exception: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getUserData($access_token, $refresh_token)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $access_token,
            'Content-Type' => 'application/x-www-form-urlencoded',
        ])->get('https://discord.com/api/users/@me');

        $user_data = $response->throw()->json();
        $user_data['refresh_token'] = $refresh_token;

        $existingUser = User::find($user_data['id']);

        if (!$existingUser) {
            $user = User::create($user_data);
        } else {
            $this->updateUser($existingUser, $user_data);
            $user = $existingUser;
            try {
                $user->tokens()->delete();
            } catch (Exception $e) {
                Log::error('Error deleting tokens for user ' . $user->id . ': ' . $e->getMessage());
            }
        }
        return $user;
    }

    public function fetchUserRoles(User $user, $access_token = '')
    {
        if (empty($access_token)) {
            $access_token = $this->refreshAccessToken($user);
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $access_token,
                'Content-Type' => 'application/x-www-form-urlencoded',
            ])->get('https://discord.com/api/users/@me/guilds/' . env('DISCORD_GUILD_ID') . '/member');
            if($response->status() !== 200){
                return [];
            }
            $result = $response->throw()->json();
            $user_roles = $result['roles'];
            
            $joined_at = date('Y-m-d H:i:s', strtotime($result['joined_at']));
            $user->update([
                'nick' => $result['nick'],
                'joined_at' => $joined_at,
            ]);

            return $user_roles;
        } catch (HttpClientException $e) {
            Log::error('HTTP Client Exception: ' . $e->getMessage());
            throw $e;
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            throw $e;
        }
    }


    public function checkGuild(User $user, $access_token = '')
    {
        if (empty($access_token)) {
            $access_token = $this->refreshAccessToken($user);
        }

        $guilds = $this->getUserGuilds($user, $access_token);
        foreach ($guilds as $guild) {
            if ($guild['id'] === "944203277552197673") {
                return true;
            }
        }
        return false;
    }
}
