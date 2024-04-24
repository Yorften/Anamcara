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
    public function handle(CharacterCreated $characterCreated): void
    {
        $tasks = Task::pluck('id')->toArray();
        $customTasks = CustomTask::where('user_id', auth()->id())->pluck('id')->toArray();
        $characterCreated->character->assignedTasks()->attach($tasks);
        $characterCreated->character->assignedCustomTasks()->attach($customTasks);
    }
}
