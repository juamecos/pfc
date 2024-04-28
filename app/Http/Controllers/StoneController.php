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

        // Inicializa $stones como una colección vacía o un valor predeterminado
        $stones = collect([]);

        if ($request->has(['latitude', 'longitude'])) {
            // Asegúrate de convertir los valores de entrada a tipo float
            $latitude = $request->latitude;
            $longitude = $request->longitude;



            try {
                $stones = $this->stoneService->findStonesNearLocation($latitude, $longitude, $perPage);

            } catch (Exception $e) {
                return Inertia::render('Error', ['message' => $e->getMessage()]);
            }
        } else {
            $filter = ['active' => true];
            $stones = $this->stoneService->getStones($perPage, $filter);
        }
        // print_r($stones);
        return Inertia::render('Stones/Index', [
            'stones' => $stones
        ]);
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
