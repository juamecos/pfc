<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Stone;
use App\Models\Comment;

class CommentSeeder extends Seeder
{

    /**
     * Seed the database with sample comments.
     *
     * @return void
     */
    public function run()
    {
        // Fetch 5 random users and 5 random stones
        $users = User::inRandomOrder()->limit(5)->get();
        $stones = Stone::inRandomOrder()->limit(5)->get();

        // Loop through each user and stone to create comments
        foreach ($users as $user) {
            foreach ($stones as $stone) {
                /** @var \App\Models\Comment $comment */
                $comment = Comment::factory()->create([
                    'stone_id' => $stone->id,
                    'user_id' => $user->id,  // Allow any user to comment on any stone
                    'content' => "Comment by user {$user->id} on stone {$stone->id}",
                ]);
            }
        }
    }
}
