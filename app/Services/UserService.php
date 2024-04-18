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

    public function getAccessToken(User $user)
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
            $access_token = $result['refresh_token'];
            $this->updateUser($user, ['refresh_token' => $access_token]);
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
            $access_token = $this->getAccessToken($user);
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

    public function getUserRoles(User $user, $access_token = '')
    {
        if (empty($access_token)) {
            $access_token = $this->getAccessToken($user);
        }

        $result = $this->checkGuild($user, $access_token);

        if ($result) {
            try {
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $access_token,
                    'Content-Type' => 'application/x-www-form-urlencoded',
                ])->get('https://discord.com/api/users/@me/guilds/' . env('DISCORD_GUILD_ID') . '/member');

                $result = $response->throw()->json();
                $user->update(['nick' => $result['nick']]);

                return $result['roles'];
            } catch (HttpClientException $e) {
                Log::error('HTTP Client Exception: ' . $e->getMessage());
                return response()->json(['error' => $e->getMessage()], 500);
            } catch (Exception $e) {
                Log::error('Exception: ' . $e->getMessage());
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }
    }


    public function checkGuild(User $user, $access_token = '')
    {
        if (empty($access_token)) {
            $access_token = $this->getAccessToken($user);
        }

        $guilds = $this->getUserGuilds($user, $access_token);
        foreach ($guilds as $guild) {
            if ($guild['id'] === "944203277552197673") {
                return true;
            }
        }
    }
}
