<?php

namespace App\Http\Controllers;

use App\Services\RoleService;

class RoleController extends Controller
{

    protected $userService, $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    public function sync()
    {
        try {
            $this->roleService->updateAppRoles();
            return response(['message' => 'Application roles updated successfully!']);
        } catch (\Exception $e) {
            return response(['error' => 'Error sending message: ' . $e->getMessage()], 500);
        }
    }
}
