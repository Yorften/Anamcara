<?php

namespace App\Listeners;

use App\Events\CharacterCreated;
use App\Models\CustomTask;
use App\Models\Task;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AttachTasks
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CharacterCreated $character): void
    {
        $tasks = Task::pluck('id')->toArray();
        $customTasks = CustomTask::pluck('id')->toArray();
        $character->assignedTasks()->attach($tasks);
        $character->assignedCustomTasks()->attach($customTasks);
    }
}
