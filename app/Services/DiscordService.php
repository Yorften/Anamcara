<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\HttpClientException;
use Illuminate\Support\Facades\Log;

class DiscordService
{
    public function getAccessToken($discord_code)
    {
        $payload = [
            'code' => $discord_code,
            'client_id' => env('DISCORD_CLIENT_ID'),
            'client_secret' => env('DISCORD_CLIENT_SECRET'),
            'grant_type' => 'authorization_code',
            'redirect_uri' => env('DISCORD_REDIRECT_URI'),
        ];

        try {
            $response = Http::asForm()->post('https://discord.com/api/oauth2/token', $payload);
            return $response->throw()->json();
        } catch (HttpClientException $e) {
            Log::error('HTTP Client Exception: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching token data:' . $e->getMessage()], 500);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'An unexpected error occurred:' . $e->getMessage()], 500);
        }
    }
}
