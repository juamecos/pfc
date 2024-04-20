<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stone;
use App\Models\Comment;
use App\Models\User;
use App\Models\ModerationLog;

class ModerationLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Obtener todos los usuarios que podrían ser moderadores.
        $users = User::where('role', 'moderator')->get();

        // Si no hay usuarios moderadores, se detiene el seeder.
        if ($users->isEmpty()) {
            echo "No moderators found. Please ensure there are users with 'moderator' role.\n";
            return;
        }

        // Obtener algunas stones y comments aleatoriamente para moderar.
        $stones = Stone::inRandomOrder()->limit(10)->get();
        $comments = Comment::inRandomOrder()->limit(10)->get();

        // Crear logs de moderación para stones.
        foreach ($stones as $stone) {
            ModerationLog::create([
                'moderatable_id' => $stone->id,
                'moderatable_type' => Stone::class,
                'action_by' => $users->random()->id,
                'action_taken' => $this->getRandomAction(),
                'reason' => 'Automatic seed moderation for testing purposes.'
            ]);
        }

        // Crear logs de moderación para comments.
        foreach ($comments as $comment) {
            ModerationLog::create([
                'moderatable_id' => $comment->id,
                'moderatable_type' => Comment::class,
                'action_by' => $users->random()->id,
                'action_taken' => $this->getRandomAction(),
                'reason' => 'Automatic seed moderation for testing purposes.'
            ]);
        }
    }

    /**
     * Retorna una acción de moderación aleatoria.
     *
     * @return string
     */
    private function getRandomAction()
    {
        $actions = ['approved', 'rejected', 'none'];
        return $actions[array_rand($actions)];
    }
}
