<?php

namespace App\Http\Controllers;

use App\Services\RoleService;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{

    protected $userService, $roleService;

    public function __construct(UserService $userService, RoleService $roleService)
    {
        $this->userService = $userService;
        $this->roleService = $roleService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // List of users
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $user = $request->user();
        $user_roles = $user->roles()->get();

        // $user_roles = $this->userService->fetchUserRoles($user);
        // $this->roleService->updateAppRoles();
        // $this->roleService->updateUserRoles($user, $user_roles);
        // $user_roles = $this->roleService->getUserRoles($user_roles);

        return response(compact('user', 'user_roles'));
    }

    public function guild(Request $request){
        $user = $request->user();
        $userInGuild = $this->userService->checkGuild($user);
        return response(compact('userInGuild'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // To be implemented
    }
}
