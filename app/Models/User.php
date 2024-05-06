<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'bio',
        'country'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email',
        'role',
        'email_verified_at',
        'updated_at'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'active' => 'boolean',
        ];
    }

    public function stones()
    {
        return $this->hasMany(Stone::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function founds()
    {
        return $this->hasMany(Found::class);
    }

    /**
     * Check if the user has a specific role
     *
     * @param string|array $roles
     * @return bool
     */
    public function hasRole($roles)
    {
        $roles = is_array($roles) ? $roles : [$roles];
        return in_array($this->role, $roles);
    }

    /**
     * Customize the array representation of the User model.
     *
     * @return array
     */
    public function toArray()
    {
        $array = parent::toArray();

        // Check if the current authenticated user is an admin or moderator
        if (Auth::check() && Auth::user()->hasRole(['admin', 'moderator'])) {
            // If admin or moderator, add back the email and role
            $array['email'] = $this->email;
            $array['role'] = $this->role;
            $array['email_verified_at'] = $this->email_verified_at;
            $array['updated_at'] = $this->updated_at;
        }

        return $array;
    }
}
