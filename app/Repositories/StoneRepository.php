<?php

namespace App\Repositories;

use App\Models\Stone;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Handles data operations for the Stone model, leveraging the Eloquent functionality.
 */
class StoneRepository extends BaseRepository
{
    /**
     * Initializes a new instance of the StoneRepository class.
     *
     * @param Stone $stone An instance of Stone model to be injected into the repository.
     */
    public function __construct(Stone $stone)
    {
        parent::__construct($stone);
    }

    /**
     * Retrieve stones ordered by most commented.
     *
     * @param int|null $perPage
     * @return LengthAwarePaginator
     */
    public function getStonesOrderedByMostCommented($perPage = 20): LengthAwarePaginator
    {
        return Stone::withCount('comments')
            ->orderBy('comments_count', 'desc')
            ->paginate($perPage)
            ->appends(['filter' => 'Most commented']);
    }

    public function getStonesOrderedByMostLiked($perPage = 20)
    {
        return Stone::withCount('likes')
            ->orderByDesc('likes_count')
            ->paginate($perPage)
            ->appends(['filter' => 'Most liked']);
        ;

    }

    public function getStonesFilteredByCountry(string $country, $perPage = 20)
    {
        // Limpiar la query para eliminar espacios en blanco
        $cleanCountry = trim($country);

        // Verificar que se está filtrando correctamente
        return Stone::where('country', $cleanCountry)
            ->orderBy('country')
            ->paginate($perPage)
            ->appends(['forCountry' => $cleanCountry]);
    }


    public function getStonesOrderedByMostRecent($perPage = 20)
    {
        return Stone::orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->appends(['filter' => 'Newest']);
    }



    /**
     * Retrieves stones ordered by proximity to a specified geographic point.
     * This method can return either a paginated result or a complete list.
     *
     * @param float $latitude Latitude of the reference point.
     * @param float $longitude Longitude of the reference point.
     * @param int|null $perPage Number of items per page for pagination, or null to return all items.
     * @return LengthAwarePaginator|Collection Returns either a paginated result or a full collection of stones.
     */
    public function getStonesOrderedByProximity($latitude, $longitude, $perPage = 20)
    {
        return Stone::orderByNearest($latitude, $longitude, $perPage);
    }

    /**
     * Retrieves stones within a specified geographic bounding box.
     * This method can return either a paginated result or a complete list.
     *
     * @param array $northEast Coordinates (latitude, longitude) of the northeast corner of the bounding box.
     * @param array $southWest Coordinates (latitude, longitude) of the southwest corner of the bounding box.
     * @param int|null $perPage Number of items per page for pagination, or null to return all items.
     * @return Collection Returns a full collection of stones.
     */
    public function getStonesWithinBoundingBox(array $northEast, array $southWest)
    {
        return Stone::withinBoundingBox($northEast, $southWest);
    }
}
