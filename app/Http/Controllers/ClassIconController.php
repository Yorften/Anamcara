<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClassIconResource;
use App\Models\ClassIcon;
use Illuminate\Http\Request;

class ClassIconController extends Controller
{
    public function index()
    {
        $icons = ClassIcon::all();
        return response(new ClassIconResource($icons));
    }
}
