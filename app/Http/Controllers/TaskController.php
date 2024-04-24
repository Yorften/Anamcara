<?php

namespace App\Http\Controllers;

use App\Events\TaskCreated;
use App\Http\Requests\Tasks\StoreTaskRequest;
use App\Http\Requests\Tasks\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Character;
use App\Models\CustomTask;
use App\Models\Task;
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

    public function default()
    {
        $tasks = Task::with([
            'icon',
            'characters' => function ($query) {
                $query->withPivot('progress')->where('user_id', auth()->id())->orderBy('id');
            },
        ])->orderBy('id')->get();
        return response(new TaskResource($tasks));
    }

    public function custom()
    {
        $tasks = CustomTask::with([
            'icon',
            'characters' => function ($query) {
                $query->withPivot('progress')->where('user_id', auth()->id())->orderBy('id');
            },
        ])->orderBy('id')->get();
        return response(new TaskResource($tasks));
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

    public function updateProgress(Request $request)
    {

        try {
            $progress = $request->input('progress');
            $charId = $request->input('char_id');
            $taskId = $request->input('task_id');
            $task = Task::findOrFail($taskId);
            $character = Character::findOrFail($charId);
            
            $character->assignedTasks()->updateExistingPivot($task->id, ['progress' => $progress]);
        } catch (\Exception $e) {
            return response(['error' => 'Task not found.'], 404);
        }
    }

    public function refreshProgress(Request $request)
    {
        try {
            $charId = $request->input('char_id');
            $taskId = $request->input('task_id');
            $task = Task::findOrFail($taskId);
            $character = Character::findOrFail($charId);

            $character->assignedTasks()->updateExistingPivot($task->id, ['progress' => 0]);
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
