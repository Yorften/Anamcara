<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $videos = Video::all();
        return response(new VideoResource($videos));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVideoRequest $request)
    {
        $validated = $request->validated();
        Video::create($validated);
        return response(['message' => 'Video added successfully!'], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $video = Video::findOrFail($id);
            $video->delete();
            return response(['message' => 'Video deleted successfully!'], 200);
        } catch (\Exception $e) {
            return response(['error' => 'Video not found.'], 404);
        }
    }
}
