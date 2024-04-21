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
        $guildApplications = GuildApplication::where('accepted', null)->get();
        $guildApplications->load('user');
        return response(new GuildApplicationResource($guildApplications));
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuildApplicationRequest $request)
    {
        $guildApplications = GuildApplication::where('user_id', auth()->id())->get();
        foreach ($guildApplications as $application) {
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
    public function show($id)
    {
        try {
            $guildApplication = GuildApplication::findOrFail($id);
            $guildApplication->load('user');
            return response(new GuildApplicationResource($guildApplication));
        } catch (\Exception $e) {
            return response(['error' => 'Application not found.'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'accepted' => 'required|boolean',
        ]);
        try {
            $guildApplication = GuildApplication::where('id', $id)->where('accepted', null)->firstOrFail();

            $guildApplication->update([
                'accepted' => $validated['accepted'],
            ]);

            if ($validated['accepted']) {
                $message = 'Application accespted successfully';
            } else {
                $message = 'Application rejected successfully';
            }

            return response(['message' => $message], 200);
        } catch (\Exception $e) {
            return response(['error' => 'Application already processed.'], 409);
        }
    }
}
