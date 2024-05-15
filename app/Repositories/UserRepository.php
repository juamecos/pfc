<?php

namespace App\Repositories;

use App\Models\User;  // Asegúrate de importar tu modelo User correctamente
use Illuminate\Database\Eloquent\Model;

/**
 * UserRepository manages the data-access logic for the User model.
 */
class UserRepository extends BaseRepository
{
    /**
     * UserRepository constructor.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        parent::__construct($user);
    }

    /**
     * You can add more specific methods here if you need to customize or extend
     * the queries that specifically relate to the User model.
     */

    /**
     * Example: Get users with a specific role.
     *
     * @param string $role
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findByRole(string $role)
    {
        return $this->model->whereHas('roles', function ($query) use ($role) {
            $query->where('name', $role);
        })->get();
    }

    /**
     * Another Example: Get active users.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findActiveUsers()
    {
        return $this->model->where('active', true)->get();
    }
}
