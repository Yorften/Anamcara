<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Services\DiscordService;
use App\Services\RoleService;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\HttpClientException;

use function PHPUnit\Framework\isEmpty;

class AuthController extends Controller
{

    protected $userService, $roleService, $discordService;

    public function __construct(UserService $userService, RoleService $roleService, DiscordService $discordService)
    {
        $this->userService = $userService;
        $this->roleService = $roleService;
        $this->discordService = $discordService;
    }


    public function callback(Request $request)
    {
        $discord_code = $request->input('code');

        $response = $this->discordService->getAccessToken($discord_code);

        if ($response) {
            try {
                $access_token = $response['access_token'];
                $refresh_token = $response['refresh_token'];

                $user = $this->userService->getUserData($access_token, $refresh_token);

                $user_roles = $this->userService->fetchUserRoles($user, $access_token);

                $this->roleService->updateUserRoles($user, $user_roles);

                $user_roles = $this->roleService->getUserRoles($user_roles);

                $token = $user->createToken('API Token')->plainTextToken;

                // Remove refresh token so it wont be accessible in the client.
                // DO NOT REMOVE UNDER ANY CIRCUMSTANCES
                $user['refresh_token'] = '';

                return response(compact('user', 'token', 'user_roles'));
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

    public function logout()
    {
        /** @disregard P1013  | tokens() marked as undefined but it works fine **/
        auth()->user()->tokens()->delete();
        return response('logged out', 204);
    }
}
