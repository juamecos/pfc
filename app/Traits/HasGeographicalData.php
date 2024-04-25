<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
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

    /**
     * Order models by the nearest to a given point.
     * 
     * @param float $latitude Latitude of the reference point.
     * @param float $longitude Longitude of the reference point.
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function orderByNearest($latitude, $longitude, $perPage = null)
    {
        try {
            $point = sprintf("POINT(%f %f)", $longitude, $latitude);
            $query = "ST_Distance_Sphere(location, ST_GeomFromText('{$point}'))";
            $results = static::orderByRaw($query);

            return is_null($perPage) ? $results->get() : $results->paginate($perPage);
        } catch (Exception $e) {
            $modelName = class_basename(static::class);  // Gets the class name dynamically
            report($e);
            throw new Exception("Failed to order Stones by nearest location - {$modelName}: " . $e->getMessage(), 0, $e);
        }
    }
}