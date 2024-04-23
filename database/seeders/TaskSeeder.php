<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::create([
            'name' => 'Chaos Dungeon',
            'frequency' => 'daily',
            'repetition' => 2,
            'ilvl' => 0,
            'icon_id' => 1,
        ]);
        Task::create([
            'name' => 'Guardian Raid',
            'frequency' => 'daily',
            'repetition' => 1,
            'ilvl' => 0,
            'icon_id' => 2,
        ]);
        Task::create([
            'name' => 'Una\'s Task',
            'frequency' => 'daily',
            'repetition' => 3,
            'ilvl' => 0,
            'icon_id' => 3,
        ]);
        Task::create([
            'name' => 'Guild Support',
            'frequency' => 'daily',
            'repetition' => 1,
            'ilvl' => 0,
            'icon_id' => 8,
        ]);
        Task::create([
            'name' => 'Guild Support',
            'frequency' => 'daily',
            'repetition' => 1,
            'ilvl' => 0,
            'icon_id' => 8,
        ]);
        Task::create([
            'name' => 'Brelshaza',
            'frequency' => 'weekly',
            'repetition' => 4,
            'ilvl' => 1540,
            'icon_id' => 5,
        ]);
        Task::create([
            'name' => 'Akkan',
            'frequency' => 'weekly',
            'repetition' => 3,
            'ilvl' => 1580,
            'icon_id' => 5,
        ]);
        Task::create([
            'name' => 'Kayangel',
            'frequency' => 'weekly',
            'repetition' => 3,
            'ilvl' => 1580,
            'icon_id' => 4,
        ]);
        Task::create([
            'name' => 'Ivory Tower',
            'frequency' => 'weekly',
            'repetition' => 4,
            'ilvl' => 1600,
            'icon_id' => 4,
        ]);
        Task::create([
            'name' => 'Thaemine',
            'frequency' => 'weekly',
            'repetition' => 4,
            'ilvl' => 1610,
            'icon_id' => 5,
        ]);
        Task::create([
            'name' => 'Kakul Saydon',
            'frequency' => 'weekly',
            'repetition' => 3,
            'ilvl' => 1475,
            'icon_id' => 5,
        ]);
    }
}
