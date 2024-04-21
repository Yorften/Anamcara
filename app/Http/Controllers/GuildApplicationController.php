<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GuildApplication;
use App\Http\Resources\GuildApplicationResource;
use App\Http\Requests\GuildApplications\StoreGuildApplicationRequest;

class GuildApplicationController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $guild_applications = GuildApplication::where('accepted', null)->get();
        $guild_applications->load('user');
        return response(new GuildApplicationResource($guild_applications));
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuildApplicationRequest $request)
    {
        $guild_applications = GuildApplication::where('user_id', auth()->id())->get();
        foreach ($guild_applications as $application) {
            if ($application->accepted === null) {
                return response(['message' => 'You already have a pending application.'], 200);
            }
        }
        $validated = $request->validated();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . "." . $image->extension();
            $image->storeAs('public/', $imageName);
            $validated['user_id'] = auth()->id();
            $validated['roster_image'] = $imageName;
            GuildApplication::create($validated);
            return response(['message' => "Application sent successfully!"], 200);
        } else {
            return response('No image was provided', 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,)
    {
        //
    }
}
