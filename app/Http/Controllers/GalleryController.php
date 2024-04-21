<?php

namespace App\Http\Controllers;

use App\Http\Resources\GalleryResource;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = Gallery::all();
        return response(new GalleryResource($images));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . "." . $image->extension();
            $image->storeAs('public/', $imageName);
            $validated['path'] = $imageName;
            Gallery::create($validated);
            return response(['message' => "Image added successfully!"], 200);
        } else {
            return response(['image' => 'No image was provided'], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $image = Gallery::findOrFail($id);
            Storage::delete('public/' . $image->path);
            $image->delete();
            return response(['message' => 'Image deleted successfully!'], 200);
        } catch (\Exception $e) {
            return response(['error' => 'Image not found.'], 404);
        }
    }
}
