<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Eliminar usuarios con correos específicos antes de sembrar nuevos
        User::where('email', 'admin@example.com')->delete();
        User::where('email', 'moderator@example.com')->delete();

        // Create an admin user if not existss
        User::firstOrCreate([
            'email' => 'admin@example.com'
        ], [
            'name' => 'Admin',
            'email_verified_at' => now(),
            'password' => Hash::make('admin123'), // Asegúrate de encriptar la contraseña
            'role' => 'admin',
            'avatar' => 'https://via.placeholder.com/100x100.png/0000FF?text=admin',
            'bio' => 'Admin account with full privileges.',
            'country' => 'ES', // Suponiendo España como ejemplo
            'active' => true,
            'remember_token' => Str::random(10)
        ]);

        // Create a moderator user if not exists
        User::firstOrCreate([
            'email' => 'moderator@example.com'
        ], [
            'name' => 'Moderator',
            'email_verified_at' => now(),
            'password' => Hash::make('moderator123'),
            'role' => 'moderator',
            'avatar' => 'https://via.placeholder.com/100x100.png/00FF00?text=moderator',
            'bio' => 'Moderator account with elevated privileges.',
            'country' => 'US', // Suponiendo Estados Unidos como ejemplo
            'active' => true,
            'remember_token' => Str::random(10)
        ]);

        // Create a moderator user if not exists
        User::firstOrCreate([
            'email' => 'normaluser@example.com'
        ], [
            'name' => 'normaluser',
            'email_verified_at' => now(),
            'password' => Hash::make('normaluser123'),
            'role' => 'user',
            'avatar' => 'https://via.placeholder.com/100x100.png/00FF00?text=normaluser',
            'bio' => 'Normal user account without privileges.',
            'country' => 'US', // Suponiendo Estados Unidos como ejemplo
            'active' => true,
            'remember_token' => Str::random(10)
        ]);

        // Create 10 regular users
        User::factory()->count(10)->create();
    }
}