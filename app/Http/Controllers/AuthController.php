<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\HttpClientException;

class AuthController extends Controller
{

    public function callback(Request $request)
    {
        $discord_code = $request->input('code');

        $payload = [
            'code' => $discord_code,
            'client_id' => env('DISCORD_CLIENT_ID'),
            'client_secret' => env('DISCORD_CLIENT_SECRET'),
            'grant_type' => 'authorization_code',
            'redirect_uri' => env('DISCORD_REDIRECT_URI'),
        ];

        try {
            $response = Http::asForm()->post('https://discord.com/api/oauth2/token', $payload);
            $result = $response->throw()->json();
        } catch (HttpClientException $e) {
            echo $e->getMessage();
        }

        if ($result) {
            try {
                $access_token = $result['access_token'];
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $access_token,
                    'Content-Type' => 'application/x-www-form-urlencoded',
                ])->get('https://discord.com/api/users/@me');

                $user = $response->throw()->json();
                $user['refresh_token'] = $result['refresh_token'];
                $created_user = User::create($user);
                return response(['user' => $created_user]);
            } catch (HttpClientException $e) {
                echo $e->getMessage();
            }
        }

        return response(['message' => "couldn't get access token"]);
    }
}
