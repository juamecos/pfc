<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Stone;
use App\Models\Found;

/**
 * Seeds the 'founds' table with random user-stone found records.
 */
class FoundSeeder extends Seeder
{
    /**
     * Executes the seed data insertion.
     * 
     * Populates the database with found records using random users and stones.
     *
     * Each user is paired with each stone to create a found record, simulating
     * users finding stones at the stone's location.
     *
     * @return void
     */
    public function run()
    {
        // Retrieve a random sample of 5 users from the database
        $users = User::inRandomOrder()->limit(5)->get();

        // Retrieve a random sample of 5 stones from the database
        $stones = Stone::inRandomOrder()->limit(5)->get();

        // Create a found record for each user and stone combination
        foreach ($users as $user) {
            foreach ($stones as $stone) {
                Found::factory()->create([
                    'stone_id' => $stone->id,   // ID of the stone found
                    'user_id' => $user->id,     // ID of the user who found the stone
                    'latitude' => $stone->latitude,  // Latitude of the found location
                    'longitude' => $stone->longitude, // Longitude of the found location
                ]);
            }
        }
    }
}