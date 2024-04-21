<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
use \Illuminate\Database\Eloquent\Collection;

trait HasGeographicalData
{
    /**
     * Set the location attribute dynamically with error handling that reflects the calling model.
     */
    protected function setLocation(): void
    {
        try {
            if (isset($this->latitude, $this->longitude) && $this->latitude && $this->longitude) {
                // Attempt to create a point and set the location
                $this->attributes['location'] = DB::raw("ST_PointFromText('POINT(" . $this->longitude . " " . $this->latitude . ")')");
            } else {
                // Set location to null if coordinates are invalid
                $this->attributes['location'] = null;
                $modelName = class_basename($this);  // Get the class name without namespace
                throw new \Exception("Invalid latitude or longitude values for {$modelName}. Both must be set and valid.");
            }
        } catch (\Exception $e) {
            // Log the error for further investigation
            report($e);
            // Safely handle the case where the operation fails
            $this->attributes['location'] = null; // Ensure location is null to maintain data integrity

            // Re-throw the exception with a specific error message
            $modelName = class_basename($this);  // Get the class name without namespace
            throw new \Exception("Failed to set the geographic location on the {$modelName}: " . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Calculate the distance to another geographical point.
     * 
     * @param float $latitude Latitude of the other point
     * @param float $longitude Longitude of the other point
     * @return float Distance in meters
     */
    public function distanceTo($latitude, $longitude)
    {
        try {
            $distance = $this->selectRaw("ST_Distance_Sphere(location, ST_GeomFromText('POINT(? ?)')) AS distance", [
                $longitude,
                $latitude
            ])->value('distance');

            if ($distance === null) {
                throw new \Exception("Location is not set or invalid in database.");
            }

            return $distance;
        } catch (\Exception $e) {
            $modelName = class_basename($this);
            report($e);
            throw new \Exception("Failed to calculate distance for {$modelName}: " . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Retrieve models within a geographic bounding box.
     * 
     * @param array $northEast Northeast coordinates ['latitude' => value, 'longitude' => value]
     * @param array $southWest Southwest coordinates ['latitude' => value, 'longitude' => value]
     * @return Collection
     */
    public static function withinBoundingBox($northEast, $southWest)
    {
        try {
            return static::whereRaw("ST_Within(location, ST_MakeEnvelope(POINT(?, ?), POINT(?, ?), 4326))", [
                $southWest['longitude'],
                $southWest['latitude'],
                $northEast['longitude'],
                $northEast['latitude']
            ])->get();
        } catch (\Exception $e) {
            $modelName = class_basename(static::class);  // Gets the class name dynamically
            report($e);
            throw new \Exception("Failed to retrieve Stones within bounding box - {$modelName}: " . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Order models by the nearest to a given point.
     * 
     * @param float $latitude Latitude of the reference point.
     * @param float $longitude Longitude of the reference point.
     * @return Collection
     */
    public static function orderByNearest($latitude, $longitude)
    {
        try {
            return static::orderByRaw("ST_Distance_Sphere(location, ST_GeomFromText('POINT(? ?)'))", [
                $longitude,
                $latitude
            ])->get();
        } catch (\Exception $e) {
            $modelName = class_basename(static::class);  // Gets the class name dynamically
            report($e);
            throw new \Exception("Failed to order Stones by nearest location - {$modelName}: " . $e->getMessage(), 0, $e);
        }
    }
}