<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;

class MiddlewareTest extends TestCase
{

    public function testUserWithoutRoleCantAccess()
    {
        $user = User::where('username', 'yoften')->first();

        $this->actingAs($user);

        $response = $this->get(route('test.middleware'));
        $response->assertStatus(403);
    }


    public function testUserWithRoleCanAccess()
    {
        $user = User::where('username', 'yoften')->first();
        $result = $user->assignRole('Officer Team');

        $this->actingAs($user);

        $response = $this->get(route('test.middleware'));
        $response->assertStatus(200)->assertSee('You have access!');
    }
}
