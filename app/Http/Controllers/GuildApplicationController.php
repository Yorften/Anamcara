<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GuildApplication;
use App\Http\Resources\GuildApplicationResource;
use App\Http\Requests\GuildApplications\StoreGuildApplicationRequest;
use App\Services\GuildApplicationService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;

class GuildApplicationController extends Controller
{

    protected $applicationService;

    public function __construct(GuildApplicationService $applicationService)
    {
        $this->applicationService = $applicationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $guildApplications = GuildApplication::where('accepted', null)->get();
        $guildApplications->load('user');
        return response(new GuildApplicationResource($guildApplications));
    }

    public function last()
    {
        $guildApplications = GuildApplication::where('accepted', null)->orderBy('created_at')->take(5)->get();
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
                return response(['message' => 'You already have a pending application.'], 500);
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
            'reason' => 'sometimes|string'
        ]);

        try {
            $guildApplication = GuildApplication::where('id', $id)->where('accepted', null)->firstOrFail();
            $user = $guildApplication->user()->first();

            // Create or get the channel with the applicant
            $channel = $this->applicationService->createChannel($user);
            $msg = $this->applicationService->generateWelcomeMessage();

            if ($validated['accepted']) {
                // Assign trail member role
                $this->applicationService->assignRole('Trial Member',$user);

                // // Remove Applicant role
                $this->applicationService->removeRole('Applicant',$user);


                // Send a DM to the applicant
                $this->applicationService->sendMessage($channel, $msg);

                $message = 'Application accepted successfully';
            } else {
                $msg = $validated['reason'];
                $this->applicationService->sendMessage($channel, $msg);

                $message = 'Application rejected successfully';
            }

            $guildApplication->update([
                'accepted' => $validated['accepted'],
            ]);
        } catch (\Exception $e) {
            if ($e instanceof ModelNotFoundException) {
                return response(['error' => 'Application not found: ' . $e->getMessage()], 500);
            } else {
                return response(['error' => 'Error sending message: ' . $e->getMessage()], 500);
            }
        }

        return response(compact('message', 'msg', 'channel'), 200);
    }

    public function history()
    {
        $guildApplications = GuildApplication::whereNotNull('accepted')->get();
        $guildApplications->load('user');
        return response(new GuildApplicationResource($guildApplications));
    }
}
