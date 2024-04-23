<?php

namespace App\Http\Controllers;

use App\Events\CharacterCreated;
use App\Http\Requests\Characters\StoreCharacterRequest;
use App\Http\Requests\Characters\UpdateCharacterRequest;
use App\Http\Resources\CharacterResource;
use App\Models\Character;
use Illuminate\Http\Request;

class CharacterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $characters = Character::with('icon')->where('user_id', auth()->id())->get();
        return response(new CharacterResource(
            $characters->map(function ($character) {
                $character->icon_path = $character->icon->path;
                return $character;
            })
        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCharacterRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $character = Character::create($validated);
        if ($character) {
            event(new CharacterCreated($character));
            return response(['message' => 'Character created successfully!']);
        } else {
            return response(['error' => 'Unkown error while creating the character'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCharacterRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            $character = Character::findOrFail($id);
            $character->update($validated);
        } catch (\Exception $e) {
            return response(['error' => 'Character not found.'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $character = Character::findOrFail($id);
            $character->delete();
            return response('', 204);
        } catch (\Exception $e) {
            return response(['error' => 'Character not found.'], 500);
        }
    }
}
