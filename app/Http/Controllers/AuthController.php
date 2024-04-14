<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{

    public function callback(Request $request)
    {
        $accessToken = $request->input('token');
        return response(compact('accessToken'));
    }
}
