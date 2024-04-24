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
        $tasks = CustomTask::with('icon')->where('user_id', auth()->id())->get();
        return response(new TaskResource($tasks->map(function ($task) {
            $task->icon_path = $task->icon->path;
            return $task;
        })));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
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
    public function update(UpdateTaskRequest $request, $id)
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
    public function destroy($id)
    {
        try {
            $customTask = CustomTask::findOrFail($id);
            $customTask->delete();
            return response('', 204);
        } catch (\Exception $e) {
            return response(['error' => 'Task not found.'], 404);
        }
    }
}
