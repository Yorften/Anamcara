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
            'path' => 'chaos-dungeon.webp'
        ]);
        Icon::create([
            'name' => 'Guardian Riad',
            'path' => 'guardian.png'
        ]);
        Icon::create([
            'name' => 'Daily Una',
            'path' => 'daily.webp'
        ]);
        Icon::create([
            'name' => 'Abyssal Dungeon',
            'path' => 'abyssal-dungeon.webp'
        ]);
        Icon::create([
            'name' => 'Legion Raid',
            'path' => 'legion_raid.png'
        ]);
        Icon::create([
            'name' => 'Weekly Una',
            'path' => 'weekly.webp'
        ]);
        Icon::create([
            'name' => 'Guild',
            'path' => 'guild.webp'
        ]);
        Icon::create([
            'name' => 'Sylmael Bloodstone',
            'path' => 'sylmael.png'
        ]);
        Icon::create([
            'name' => 'Pirate Coin',
            'path' => 'pirate_coin.png'
        ]);
    }
}
