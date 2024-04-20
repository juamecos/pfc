<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        // Call other seeders here
        $this->call([
            UserSeeder::class,
            StoneSeeder::class,
            LikeSeeder::class,
            CommentSeeder::class,
            FoundSeeder::class,
            ModerationLogSeeder::class
        ]);
    }
}
