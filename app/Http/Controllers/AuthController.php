<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{

    public function callback(Request $request)
    {
        if (!isset($_GET['code'])) {
            echo 'no code';
            exit();
        }

        $discord_code = $_GET['code'];

        $payload = [
            'code' => $discord_code,
            'client_id' => env('DISCORD_CLIENT_ID'),
            'client_secret' => env('DISCORD_CLIENT_SECRET'),
            'grant_type' => 'authorization_code',
            'redirect_uri' => env('DISCORD_REDIRECT_URI'),
        ];


        $payload_string = http_build_query($payload);
        $discord_token_url = "https://discordapp.com/api/oauth2/token";

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $discord_token_url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

        $result = curl_exec($ch);

        if (!$result) {
            echo curl_error($ch);
        }

        dd($result);

        $result = json_decode($result, true);
        $access_token = $result['access_token'];
    }
}
