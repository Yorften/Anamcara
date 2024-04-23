<?php

namespace Database\Seeders;

use App\Models\ClassIcon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassIconSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ClassIcon::create([
            'name' => 'Destroyer',
            'path' => 'class_00.png'
        ]);
        ClassIcon::create([
            'name' => 'Arcana',
            'path' => 'class_02.png'
        ]);
        ClassIcon::create([
            'name' => 'Berserker',
            'path' => 'class_03.png'
        ]);
        ClassIcon::create([
            'name' => 'Wardancer',
            'path' => 'class_04.png'
        ]);
        ClassIcon::create([
            'name' => 'Deadeye',
            'path' => 'class_05.png'
        ]);
        ClassIcon::create([
            'name' => 'Gunlancer',
            'path' => 'class_07.png'
        ]);
        ClassIcon::create([
            'name' => 'Scrapper',
            'path' => 'class_09.png'
        ]);
        ClassIcon::create([
            'name' => 'Summoner',
            'path' => 'class_11.png'
        ]);
        ClassIcon::create([
            'name' => 'Soulfist',
            'path' => 'class_13.png'
        ]);
        ClassIcon::create([
            'name' => 'Sharpshooter',
            'path' => 'class_14.png'
        ]);
        ClassIcon::create([
            'name' => 'Artillerist',
            'path' => 'class_15.png'
        ]);
        ClassIcon::create([
            'name' => 'Bard',
            'path' => 'class_16.png'
        ]);
        ClassIcon::create([
            'name' => 'Glavier',
            'path' => 'class_17.png'
        ]);
        ClassIcon::create([
            'name' => 'Dearthblade',
            'path' => 'class_19.png'
        ]);
        ClassIcon::create([
            'name' => 'Shadowhunter',
            'path' => 'class_20.png'
        ]);
        ClassIcon::create([
            'name' => 'Paladin',
            'path' => 'class_21.png'
        ]);
        ClassIcon::create([
            'name' => 'Scouter',
            'path' => 'class_22.png'
        ]);
        ClassIcon::create([
            'name' => 'Gunslinger',
            'path' => 'class_25.png'
        ]);
        ClassIcon::create([
            'name' => 'Striker',
            'path' => 'class_27.png'
        ]);
        ClassIcon::create([
            'name' => 'Sorceress',
            'path' => 'class_28.png'
        ]);
        ClassIcon::create([
            'name' => 'Artist',
            'path' => 'class_29.png'
        ]);
        ClassIcon::create([
            'name' => 'Slayer',
            'path' => 'class_30.png'
        ]);
        ClassIcon::create([
            'name' => 'Aeromancer',
            'path' => 'class_31.png'
        ]);
        ClassIcon::create([
            'name' => 'Reaper',
            'path' => 'class_32.png'
        ]);
        ClassIcon::create([
            'name' => 'Breaker',
            'path' => 'class_33.png'
        ]);
    }
}
