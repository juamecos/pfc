<?php

namespace App\Services;

use App\Repositories\StoneRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class StoneService extends BaseService
{
    protected $stoneRepository;

    public function __construct(StoneRepository $stoneRepository)
    {
        parent::__construct($stoneRepository);
    }

    /**
     * Returns a list of stones ordered by proximity to a given location.
     * If perPage is provided, it returns a paginated result; otherwise, it returns a collection.
     *
     * @param float $latitude The latitude of the location.
     * @param float $longitude The longitude of the location.
     * @param int|null $perPage The number of items per page, or null for no pagination.
     * @return LengthAwarePaginator|Collection A collection of stones ordered by proximity.
     */
    public function findStonesNearLocation($latitude, $longitude, $perPage = null)
    {
        return $this->stoneRepository->getStonesOrderedByProximity($latitude, $longitude, $perPage);
    }

    /**
     * Returns a list of stones within a given bounding box.
     * If perPage is provided, it returns a paginated result; otherwise, it returns a collection.
     *
     * @param array $northEast The coordinates of the north-east corner of the bounding box.
     * @param array $southWest The coordinates of the south-west corner of the bounding box.
     * @param int|null $perPage The number of items per page, or null for no pagination.
     * @return LengthAwarePaginator|Collection A collection of stones within the bounding box.
     */
    public function findStonesInArea(array $northEast, array $southWest, $perPage = null)
    {
        return $this->stoneRepository->getStonesWithinBoundingBox($northEast, $southWest, $perPage);
    }
}
