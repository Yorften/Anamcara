<?php

namespace Database\Seeders;

use App\Models\Icon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IconSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Icon::create([
            'name' => 'Chaos Dungeon',
            'path' => 'react/public/assets/Icons/tasks/chaos-dungeon.webp'
        ]);
        Icon::create([
            'name' => 'Guardian Riad',
            'path' => 'react/public/assets/Icons/tasks/guardian.png'
        ]);
        Icon::create([
            'name' => 'Daily Una',
            'path' => 'react/public/assets/Icons/tasks/daily.webp'
        ]);
        Icon::create([
            'name' => 'Abyssal Dungeon',
            'path' => 'react/public/assets/Icons/tasks/abyssal-dungeon.webp'
        ]);
        Icon::create([
            'name' => 'Legion Raid',
            'path' => 'react/public/assets/Icons/tasks/legion_raid.png'
        ]);
        Icon::create([
            'name' => 'Weekly Una',
            'path' => 'react/public/assets/Icons/tasks/weekly.webp'
        ]);
        Icon::create([
            'name' => 'Guild',
            'path' => 'react/public/assets/Icons/tasks/guild.webp'
        ]);
        Icon::create([
            'name' => 'Sylmael Bloodstone',
            'path' => 'react/public/assets/Icons/tasks/sylmael.png'
        ]);
        Icon::create([
            'name' => 'Pirate Coin',
            'path' => 'react/public/assets/Icons/tasks/pirate_coin.png'
        ]);
    }
}
