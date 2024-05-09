<?php

namespace App\Http\Controllers;

use App\Models\Stone;
use App\Http\Requests\StoreStoneRequest;
use App\Http\Requests\UpdateStoneRequest;
use App\Services\StoneService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

/**
 * Class StoneController
 * @package App\Http\Controllers
 * Controller for managing Stone resources.
 */
class StoneController extends BaseController
{
    protected $stoneService;

    /**
     * Create a new controller instance.
     *
     * @param StoneService $stoneService
     */
    public function __construct(StoneService $stoneService)
    {
        $this->stoneService = $stoneService;
    }


    /**
     * Display a listing of stones.
     *
     * @return \Inertia\Response
     */
    /**
     * Display a listing of stones.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $perPage = 20;

        try {
            if ($request->has(['latitude', 'longitude'])) {
                $latitude = $request->input('latitude');
                $longitude = $request->input('longitude');

                $stones = $this->stoneService->findStonesNearLocation($latitude, $longitude, $perPage);

                return Inertia::render('Stones/Index', [
                    'stones' => $stones
                ]);
            }

            if ($request->has('forCountry')) {
                $forCountry = $request->input('forCountry');
                $stones = $this->stoneService->getStonesFilteredByCountry($forCountry, $perPage);

                return Inertia::render('Stones/Index', [
                    'stones' => $stones
                ]);
            }

            if ($request->has('filter')) {
                $filter = $request->input('filter');

                switch ($filter) {
                    case 'Most commented':
                        $stones = $this->stoneService->getStonesOrderedByMostCommented($perPage);
                        break;
                    case 'Most liked':
                        $stones = $this->stoneService->getStonesOrderedByMostLiked($perPage);
                        break;
                    case 'Newest':
                        $stones = $this->stoneService->getStonesOrderedByMostRecent($perPage);
                        break;
                    default:
                        return Inertia::render('Error', [
                            'message' => 'Invalid filter type provided'
                        ]);
                }

                return Inertia::render('Stones/Index', [
                    'stones' => $stones
                ]);
            }

            // Valor predeterminado: Most Recent
            $stones = $this->stoneService->getStonesOrderedByMostRecent($perPage);

            return Inertia::render('Stones/Index', [
                'stones' => $stones
            ]);
        } catch (Exception $e) {
            return Inertia::render('Error', ['message' => $e->getMessage()]);
        }
    }




    /**
     * Find stones near a specified location.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function findNear(StoreStoneRequest $request)
    {
        $latitude = $request->query('latitude');
        $longitude = $request->query('longitude');
        $perPage = $request->query('perPage', null); // Default to null if not provided

        try {
            $stones = $this->stoneService->findStonesNearLocation($latitude, $longitude, $perPage);
            return Inertia::render('Stones/Near', ['stones' => $stones]);
        } catch (Exception $e) {
            return Inertia::render('Error', ['message' => $e->getMessage()]);
        }
    }

    public function discover(Request $request)
    {
        $northEast = $request->input('northEast', ['latitude' => 40.9153, 'longitude' => -73.7004]);
        $southWest = $request->input('southWest', ['latitude' => 40.4960, 'longitude' => -74.2557]);

        $stones = $this->stoneService->findStonesInArea($northEast, $southWest, 20);

        return Inertia::render('Discover', [
            'stones' => $stones,
            'northEast' => $northEast,
            'southWest' => $southWest
        ]);
    }

    /**
     * Show the form for creating a new stone.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return $this->render('Stones/Create', [
            'user' => auth()->user()
        ]);
    }

    /**
     * Store a newly created stone in storage.
     *
     * @param StoreStoneRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreStoneRequest $request): RedirectResponse
    {

        $validatedData = $request->validated();


        $this->stoneService->createStone($validatedData);

        return redirect()->route('stone.index')->with('success', 'Stone created successfully!');
    }

    /**
     * Display the specified stone.
     *
     * @param Stone $stone
     * @return \Inertia\Response
     */
    public function show(Stone $stone)
    {
        $stoneDetails = $this->stoneService->findStoneByID($stone->id);

        return Inertia::render('Stones/Show', ['stone' => $stoneDetails]);
    }

    /**
     * Show the form for editing the specified stone.
     *
     * @param Stone $stone
     * @return \Inertia\Response
     */
    public function edit(Stone $stone)
    {
        return $this->render('Stones/Edit', ['stone' => $stone]);
    }

    /**
     * Update the specified stone in storage.
     *
     * @param UpdateStoneRequest $request
     * @param Stone $stone
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateStoneRequest $request, Stone $stone)
    {
        $stone->update($request->validated());
        return Redirect::route('stones.show', $stone);
    }

    /**
     * Remove the specified stone from storage.
     *
     * @param Stone $stone
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Stone $stone)
    {
        $stone->delete();
        return Redirect::route('stones.index');
    }
}
