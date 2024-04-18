<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Services\RoleService;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\HttpClientException;

class AuthController extends Controller
{

    protected $userService, $roleService;

    public function __construct(UserService $userService, RoleService $roleService)
    {
        $this->userService = $userService;
        $this->roleService = $roleService;
    }


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
            Log::error('HTTP Client Exception: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching token data:' . $e->getMessage()], 500);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'An unexpected error occurred:' . $e->getMessage()], 500);
        }

        if ($result) {
            try {
                $access_token = $result['access_token'];
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $access_token,
                    'Content-Type' => 'application/x-www-form-urlencoded',
                ])->get('https://discord.com/api/users/@me');

                $user_data = $response->throw()->json();
                $user_data['refresh_token'] = $result['refresh_token'];

                $existingUser = User::find($user_data['id']);

                if (!$existingUser) {
                    $user = User::create($user_data);
                } else {
                    $this->userService->updateUser($existingUser, $user_data);
                    $user = $existingUser;
                    try {
                        $user->tokens()->delete();
                    } catch (Exception $e) {
                        Log::error('Error deleting tokens for user ' . $user->id . ': ' . $e->getMessage());
                    }
                }
                $guild_roles = $this->roleService->updateAppRoles();
                $user_roles = $this->userService->getUserRoles($user, $access_token);
                $this->roleService->updateUserRoles($user, $user_roles);
                $token = $user->createToken('API Token')->plainTextToken;

                return response(compact('user', 'token', 'user_roles', 'guild_roles'));
            } catch (HttpClientException $e) {
                Log::error('HTTP Client Exception: ' . $e->getMessage());
                return response()->json(['error' => 'An error occurred while fetching user data:'], 500);
            } catch (Exception $e) {
                Log::error('Exception: ' . $e->getMessage());
                return response()->json(['error' => 'An unexpected error occurred:' . $e->getMessage()], 500);
            }
        }

        return response(['message' => "couldn't get access token"]);
    }
}
