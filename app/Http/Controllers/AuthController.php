<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\HttpClientException;

class AuthController extends Controller
{

    public function callback(Request $request)
    {
        if (!$request->has('code')) {
            echo 'no code';
            exit();
        }

        $discord_code = $request->query('code');

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
            dd($result);
        } catch (HttpClientException $e) {
            echo $e->getMessage();
        }
    }
}
