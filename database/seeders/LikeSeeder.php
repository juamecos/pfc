<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Stone;
use App\Models\Like;

class LikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $stones = Stone::all();  // Get all stones
        $users = User::all();    // Get all users

        foreach ($stones as $stone) {
            // Filter out the stone's creator from the users collection
            $eligibleUsers = $users->where('id', '!=', $stone->user_id);

            // Randomly pick up to 5 users from the eligible users to like the stone
            $eligibleUsers->random(min(5, $eligibleUsers->count()))->each(function ($user) use ($stone) {
                Like::firstOrCreate([
                    'stone_id' => $stone->id,
                    'user_id' => $user->id
                ]);
            });
        }
    }
}
