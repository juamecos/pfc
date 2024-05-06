<?php

namespace App\Http\Controllers;

use App\Models\Stone;
use App\Http\Requests\StoreStoneRequest;
use App\Http\Requests\UpdateStoneRequest;
use App\Services\StoneService;
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

        if ($request->has(['latitude', 'longitude'])) {
            $latitude = $request->latitude;
            $longitude = $request->longitude;
            try {
                $stones = $this->stoneService->findStonesNearLocation($latitude, $longitude, $perPage);
                return Inertia::render('Stones/Index', ['stones' => $stones]);
            } catch (Exception $e) {
                return Inertia::render('Error', ['message' => $e->getMessage()]);
            }
        }

        if ($request->has('forCountry')) {
            $forCountry = $request->forCountry;
            $stones = $this->stoneService->getStonesFilteredByCountry($forCountry);
            return Inertia::render('Stones/Index', ['stones' => $stones]);
        }

        if ($request->has('filter')) {
            $filter = $request->filter;
            switch ($filter) {
                case 'Most commented':
                    $stones = $this->stoneService->getStonesOrderedByMostCommented();
                    break;
                case 'Most liked':
                    $stones = $this->stoneService->getStonesOrderedByMostLiked();
                    break;
                case 'Newest':
                    $stones = $this->stoneService->getStonesOrderedByMostRecent();
                    break;
                default:
                    return Inertia::render('Error', ['message' => 'Invalid filter type provided']);
            }
            return Inertia::render('Stones/Index', ['stones' => $stones]);
        }

        // Si ninguna condición coincide, retorna un mensaje de error por defecto
        return Inertia::render('Error', ['message' => 'No valid filter or location data provided']);
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

    /**
     * Show the form for creating a new stone.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return $this->render('Stones/Create');
    }

    /**
     * Store a newly created stone in storage.
     *
     * @param StoreStoneRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreStoneRequest $request)
    {
        $stone = Stone::create($request->validated());
        return Redirect::route('stones.show', $stone);
    }

    /**
     * Display the specified stone.
     *
     * @param Stone $stone
     * @return \Inertia\Response
     */
    public function show(Stone $stone)
    {
        return $this->render('Stones/Show', ['stone' => $stone]);
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
