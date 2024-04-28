<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use \Illuminate\Database\Eloquent\Collection;
use Exception;

trait HasGeographicalData
{
    /**
     * Set the location attribute dynamically with error handling that reflects the calling model.
     */
    protected function setLocation(): void
    {
        try {
            if (isset($this->latitude, $this->longitude) && $this->latitude && $this->longitude) {
                $this->attributes['location'] = DB::raw("ST_PointFromText('POINT(" . $this->attributes['longitude'] . " " . $this->attributes['latitude'] . ")')");
            } else {
                throw new Exception("Both latitude and longitude must be set and valid.");
            }
        } catch (Exception $e) {
            report($e);
            throw new Exception("Failed to set location: " . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Calculate the distance to another geographical point.
     * 
     * @param float $latitude Latitude of the other point
     * @param float $longitude Longitude of the other point
     * @return float Distance in meters
     */
    public function distanceTo(float $latitude, float $longitude): float
    {
        try {
            $query = "SELECT ST_DISTANCE_SPHERE(
                ST_GeomFromText(CONCAT('POINT(', ?, ' ', ?, ')')),
                ST_GeomFromText(CONCAT('POINT(', ?, ' ', ?, ')'))
            ) AS distance";
            $result = DB::selectOne($query, [$this->longitude, $this->latitude, $longitude, $latitude]);
            return $result->distance ?? throw new Exception("Distance calculation failed.");
        } catch (Exception $e) {
            report($e);
            throw new Exception("Failed to calculate distance: " . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Retrieve models within a geographic bounding box.
     * 
     * @param array $northEast Northeast coordinates ['latitude' => value, 'longitude' => value]
     * @param array $southWest Southwest coordinates ['latitude' => value, 'longitude' => value]
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function withinBoundingBox(array $northEast, array $southWest)
    {
        try {
            $polygon = sprintf(
                "POLYGON((%f %f, %f %f, %f %f, %f %f, %f %f))", // Format as POLYGON((lng lat, lng lat, ...))
                $southWest['longitude'],
                $southWest['latitude'], // Suroeste
                $southWest['longitude'],
                $northEast['latitude'], // Noroeste
                $northEast['longitude'],
                $northEast['latitude'], // Noreste
                $northEast['longitude'],
                $southWest['latitude'], // Sureste
                $southWest['longitude'],
                $southWest['latitude']  // Cerrando el polígono de nuevo en el Suroeste
            );

            $query = static::whereRaw("ST_WITHIN(location, ST_GeomFromText(?)) = 1", [$polygon]);

            return $query->get();
        } catch (Exception $e) {
            report($e);
            throw new Exception("Failed to retrieve models within bounding box: " . $e->getMessage(), 0, $e);
        }
    }

    //TODO cHECK WHY IS GIVING ME 70 STONES

    /**
     * Order models by the nearest to a given point.
     * 
     * @param float $latitude Latitude of the reference point.
     * @param float $longitude Longitude of the reference point.
     * @return Collection | LengthAwarePaginator
     */
    public static function orderByNearest($latitude, $longitude, $perPage = 20)
    {
        try {
            // Define the point using the provided latitude and longitude
            $point = "ST_GeomFromText('POINT($longitude $latitude)')";

            // Define the subquery for the latest founds
            $latestFoundsSubQuery = DB::table('founds as f')
                ->select('f.stone_id', 'f.latitude', 'f.longitude', 'f.location')
                ->joinSub(
                    DB::table('founds')
                        ->select('stone_id', DB::raw('MAX(created_at) AS max_created_at'))
                        ->groupBy('stone_id'),
                    'latest_founds',
                    function ($join) {
                        $join->on('f.stone_id', '=', 'latest_founds.stone_id')
                            ->on('f.created_at', '=', 'latest_founds.max_created_at');
                    }
                );

            // Build the main query using Stones table
            $results = DB::table('stones as s')
                ->selectRaw("
                s.id, s.image, s.title, s.description, s.user_id,
                COALESCE(f.latitude, s.latitude) AS effective_latitude,
                COALESCE(f.longitude, s.longitude) AS effective_longitude,
                ST_Distance_Sphere(
                    POINT(COALESCE(f.longitude, s.longitude), COALESCE(f.latitude, s.latitude)),
                    {$point}
                ) AS distance
            ")
                ->leftJoinSub($latestFoundsSubQuery, 'f', 's.id', '=', 'f.stone_id')
                ->orderBy('distance');

            // Return paginated results or all results
            $results = $results->distinct('id');

            return $results->paginate($perPage = 20)->appends([
                'latitude' => $latitude,
                'longitude' => $longitude
            ]);

        } catch (Exception $e) {
            report($e);
            throw new Exception("Failed to order Stones by nearest location with detailed location data: " . $e->getMessage(), 0, $e);
        }
    }


}
