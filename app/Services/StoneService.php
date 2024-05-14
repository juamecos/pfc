<?php

namespace App\Services;

use App\Repositories\StoneRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Exception;

class StoneService extends BaseService
{
    protected $stoneRepository;

    /**
     * StoneService constructor.
     * @param StoneRepository $stoneRepository
     */
    public function __construct(StoneRepository $stoneRepository)
    {
        $this->stoneRepository = $stoneRepository;
    }

    /**
     * Retrieve all stones.
     *
     * @return Collection|LengthAwarePaginator
     * @throws Exception
     */
    public function getAllStones()
    {
        try {
            return $this->stoneRepository->all();
        } catch (Exception $e) {
            throw new Exception("Failed to retrieve all stones: " . $e->getMessage());
        }
    }

    /**
     * Retrieve stones based on filters and pagination settings.
     *
     * @param array $filter Filters to apply.
     * @param int|null $perPage Number of items per page. Null for no pagination.
     * @param array $columns Specific columns to retrieve.
     * @return LengthAwarePaginator|Collection
     * @throws Exception If there's an error in retrieving the stones.
     */
    public function getStones($perPage = null, array $filter = [], array $columns = ['id', 'image', 'title', 'description', 'latitude', 'longitude', 'user_id', 'created_at'])
    {
        try {
            return $this->stoneRepository->filteredPagination($perPage, $filter, $columns);

        } catch (Exception $e) {
            throw new Exception("Error retrieving stones - getStones: " . $e->getMessage());
        }
    }



    /**
     * Find a stone by ID.
     *
     * @param int $stoneId The ID of the stone to find.
     * @return mixed
     * @throws Exception
     */
    public function findStoneByID(int $stoneId): array
    {
        try {
            $stone = $this->stoneRepository->find($stoneId);
            if (!$stone) {
                throw new Exception("Stone with ID {$stoneId} not found.");
            }

            // Convert the model to an array (or fetch as array from the start if possible)
            $stoneData = $stone->toArray();

            // Check user permissions
            $user = Auth::user();
            $isOwner = $user && $user->id === $stone->user_id;
            $hasAdminAccess = $user && ($user->is_admin || $user->is_moderator);

            // Remove sensitive fields if the user is not authorized
            if (!$isOwner && !$hasAdminAccess) {
                unset($stoneData['code']);
                unset($stoneData['status']);
                unset($stoneData['report_count']);
                unset($stoneData['moderation_status']);
            }

            // Remove sensitive fields if the user is not authorized
            if (!$hasAdminAccess) {
                unset($stoneData['status']);
                unset($stoneData['report_count']);
                unset($stoneData['moderation_status']);
            }

            return $stoneData;
        } catch (Exception $e) {
            throw new Exception("Failed to find stone with ID {$stoneId}: " . $e->getMessage());
        }

    }

    /**
     * Retrieve stones ordered by the most commented.
     *
     * @param int|null $perPage
     * @return LengthAwarePaginator
     * @throws Exception If there's an error in retrieving the stones.
     */
    public function getStonesOrderedByMostCommented($perPage = 20): LengthAwarePaginator
    {
        try {
            return $this->stoneRepository->getStonesOrderedByMostCommented($perPage);
        } catch (Exception $e) {
            throw new Exception("Error retrieving stones ordered by most commented: " . $e->getMessage());
        }
    }

    public function getStonesOrderedByMostLiked($perPage = 20)
    {
        return $this->stoneRepository->getStonesOrderedByMostLiked($perPage);
    }

    public function getStonesFilteredByCountry(string $country, $perPage = 20)
    {
        return $this->stoneRepository->getStonesFilteredByCountry($country, $perPage);
    }

    public function getStonesOrderedByMostRecent()
    {
        return $this->stoneRepository->getStonesOrderedByMostRecent();
    }


    /**
     * Creates a new stone with the required and additional data, ensuring the user is valid.
     *
     * @param array $data Data for creating a new stone.
     * @return mixed
     * @throws Exception If the stone cannot be created due to missing data or invalid user.
     */
    public function createStone(array $data)
    {
        try {
            // Ensure required fields are present
            $requiredFields = ['image', 'title', 'latitude', 'longitude', 'country', 'city'];
            foreach ($requiredFields as $field) {
                if (!array_key_exists($field, $data)) {
                    throw new Exception("Missing required field: {$field}");
                }
            }

            // Check if the user is logged in and exists in the database
            $userId = Auth::id();
            if (!$userId || !User::find($userId)) {
                throw new Exception("Invalid or no user logged in.");
            }
            $data['user_id'] = $userId;



            // Create the stone
            return $this->stoneRepository->createStone($data);
        } catch (Exception $e) {
            // Append the incoming data to the exception message for better debugging
            $dataString = json_encode($data);
            throw new Exception("Failed to create a new stone with data {$dataString}: " . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Update a stone, ensuring only the creator can make changes.
     *
     * @param int $stoneId The ID of the stone to update.
     * @param array $data Data to update the stone.
     * @return mixed
     * @throws Exception If the stone cannot be updated due to permission issues or other errors.
     */
    public function updateStone(int $stoneId, array $data)
    {
        try {
            $stone = $this->stoneRepository->find($stoneId);
            if (!$stone) {
                throw new Exception("Stone with ID {$stoneId} not found.");
            }

            // Check if the current user is the creator of the stone
            if ($stone->user_id !== Auth::id()) {
                throw new Exception("Unauthorized to update stone. Only the creator can update the stone.");
            }

            // Update the stone
            return $this->stoneRepository->update($stone, $data);
        } catch (Exception $e) {
            throw new Exception("Failed to update stone with ID {$stoneId}: " . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Delete a stone, ensuring it is done by the user who created it or by an admin/moderator.
     *
     * @param int $stoneId The ID of the stone to delete.
     * @return bool
     * @throws Exception If the stone does not exist, if the user does not have permission, or if there is an error during deletion.
     */
    public function deleteStone(int $stoneId)
    {
        $stone = $this->stoneRepository->find($stoneId);
        if (!$stone) {
            throw new Exception("Stone with ID {$stoneId} not found.");
        }

        // Verify if the current authenticated user is the owner of the stone or has admin/moderator privileges
        if ($stone->user_id !== Auth::id() && !Auth::user()->hasRole(['admin', 'moderator'])) {
            throw new Exception("Unauthorized attempt to delete a stone.");
        }

        // Attempt to delete the stone and return the result
        if (!$this->stoneRepository->delete($stone)) {
            throw new Exception("Failed to delete stone.");
        }
        return true;
    }

    public function findStoneByCode(string $code)
    {
        try {
            return $this->stoneRepository->findStoneByCode($code);
        } catch (Exception $e) {
            throw new Exception("Failed to find stone with code {$code}: " . $e->getMessage());
        }
    }

    /**
     * Retrieves stones ordered by proximity to a specified geographic point,
     * ensuring the latitude and longitude are valid and within correct ranges.
     *
     * @param float $latitude Latitude of the reference point.
     * @param float $longitude Longitude of the reference point.
     * @param int|null $perPage Number of items per page for pagination, or null for no pagination.
     * @return LengthAwarePaginator|Collection
     * @throws Exception If latitude or longitude are out of range or not provided.
     */
    public function findStonesNearLocation(float $latitude, float $longitude, $perPage = null)
    {
        // Validate the latitude and longitude values
        if ($latitude < -90 || $latitude > 90) {
            throw new Exception("Latitude must be between -90 and 90 degrees. Provided: {$latitude}");
        }
        if ($longitude < -180 || $longitude > 180) {
            throw new Exception("Longitude must be between -180 and 180 degrees. Provided: {$longitude}");
        }

        try {
            return $this->stoneRepository->getStonesOrderedByProximity($latitude, $longitude, $perPage);
        } catch (Exception $e) {
            throw new Exception("Failed to find stones near location [Lat: {$latitude}, Lng: {$longitude}]: " . $e->getMessage());
        }
    }

    /**
     * Retrieves stones within a specified geographic bounding box, ensuring coordinates are valid.
     *
     * @param array $northEast Coordinates of the northeast corner of the bounding box (expects ['latitude' => float, 'longitude' => float]).
     * @param array $southWest Coordinates of the southwest corner of the bounding box (expects ['latitude' => float, 'longitude' => float]).
     * @param int|null $perPage Number of items per page for pagination, or null for no pagination.
     * @return LengthAwarePaginator|Collection
     * @throws Exception If the coordinates are not valid arrays or outside valid ranges.
     */
    public function findStonesInArea(array $northEast, array $southWest, $perPage = null)
    {
        // Validate coordinate arrays
        if (!$this->validateCoordinates($northEast) || !$this->validateCoordinates($southWest)) {
            throw new Exception("Invalid coordinates provided for bounding box.");
        }

        // Ensure coordinates are within valid ranges
        if (!$this->coordinatesInRange($northEast) || !$this->coordinatesInRange($southWest)) {
            throw new Exception("Coordinates are out of range.");
        }

        try {
            return $this->stoneRepository->getStonesWithinBoundingBox($northEast, $southWest);
        } catch (Exception $e) {
            throw new Exception("Failed to find stones in area defined by NE " . json_encode($northEast) . " and SW " . json_encode($southWest) . ": " . $e->getMessage());
        }
    }

    /**
     * Validates if the provided array has the necessary latitude and longitude keys and numeric values.
     *
     * @param array $coordinates
     * @return bool
     */
    private function validateCoordinates(array $coordinates): bool
    {
        return isset($coordinates['latitude'], $coordinates['longitude']) &&
            is_numeric($coordinates['latitude']) &&
            is_numeric($coordinates['longitude']);
    }

    /**
     * Checks if the provided coordinates are within the valid ranges for latitude and longitude.
     *
     * @param array $coordinates
     * @return bool
     */
    private function coordinatesInRange(array $coordinates): bool
    {
        return $coordinates['latitude'] >= -90 && $coordinates['latitude'] <= 90 &&
            $coordinates['longitude'] >= -180 && $coordinates['longitude'] <= 180;
    }

    /**
     * Report a stone, increasing its report count and possibly updating its moderation status.
     *
     * Verifies that the stone exists before attempting to report it.
     *
     * @param int $stoneId The ID of the stone to report.
     * @return bool
     * @throws Exception If the stone does not exist or if the reporting fails.
     */
    public function reportStone(int $stoneId): bool
    {
        try {
            $stone = $this->stoneRepository->find($stoneId);
            if (!$stone) {
                throw new Exception("Stone with ID {$stoneId} not found.");
            }

            // Report the stone
            $stone->report(); // Assuming report() increments the count and updates the status if needed
            return true;
        } catch (Exception $e) {
            throw new Exception("Failed to report stone with ID {$stoneId}: " . $e->getMessage(), 0, $e);
        }
    }

    /**
     * Moderate a stone with a specified action and reason, ensuring that only moderators or admins can perform this action.
     *
     * @param int $stoneId The ID of the stone to moderate.
     * @param string $action The action to be taken (e.g., 'approved', 'rejected').
     * @param string $reason The reason for moderation.
     * @return bool
     * @throws Exception If the user is unauthorized, if the stone does not exist, or if there is an error during the moderation process.
     */
    public function moderateStone(int $stoneId, string $action, string $reason): bool
    {
        try {
            // Check if the user is allowed to moderate
            if (!Auth::check() || !in_array(Auth::user()->role, ['moderator', 'admin'])) {
                throw new Exception("Unauthorized access. Only moderators or admins can perform moderation.");
            }

            // Find the stone to ensure it exists
            $stone = $this->stoneRepository->find($stoneId);
            if (!$stone) {
                throw new Exception("Stone with ID {$stoneId} not found.");
            }

            // Perform the moderation
            $stone->moderate($action, $reason); // Assuming moderate() updates the stone based on the action and logs the change
            return true;
        } catch (Exception $e) {
            throw new Exception("Failed to moderate stone with ID {$stoneId}: " . $e->getMessage(), 0, $e);
        }
    }
}
