<?php

namespace App\Http\Controllers;

use App\Events\TaskCreated;
use App\Http\Requests\Tasks\StoreTaskRequest;
use App\Http\Requests\Tasks\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\CustomTask;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = CustomTask::all();
        return response(new TaskResource($tasks));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $validated = $request->validated();
        $customTask = CustomTask::create($validated);
        if ($customTask) {
            event(new TaskCreated($customTask));
            return response(['message' => 'Task created successfully!']);
        } else {
            return response(['error' => 'Unkown error while creating the task'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, string $id)
    {
        try {
            $validated = $request->validated();
            $customTask = CustomTask::findOrFail($id);
            $customTask->update($validated);
        } catch (\Exception $e) {
            return response(['error' => 'Task not found.'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $customTask = CustomTask::findOrFail($id);
            $customTask->dalete();
        } catch (\Exception $e) {
            return response(['error' => 'Task not found.'], 404);
        }
    }
}
