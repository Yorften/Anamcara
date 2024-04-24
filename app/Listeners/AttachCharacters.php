<?php

namespace App\Listeners;

use App\Events\TaskCreated;
use App\Models\Character;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AttachCharacters
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
    public function handle(TaskCreated $taskCreated): void
    {
        $characters = Character::where('user_id', auth()->id())->pluck('id')->toArray();
        $taskCreated->task->characters()->attach($characters);
    }
}
