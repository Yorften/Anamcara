<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClassIconResource;
use App\Models\ClassIcon;
use App\Models\Icon;
use Illuminate\Http\Request;

class ClassIconController extends Controller
{
    public function index()
    {
        $icons = ClassIcon::all();
        return response(new ClassIconResource($icons));
    }

    public function taskIndex()
    {
        $icons = Icon::all();
        return response(new ClassIconResource($icons));
    }
}
