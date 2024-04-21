<?php

namespace App\Http\Controllers;

use App\Models\Stone;
use App\Http\Requests\StoreStoneRequest;
use App\Http\Requests\UpdateStoneRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

/**
 * Class StoneController
 * @package App\Http\Controllers
 * Controller for managing Stone resources.
 */
class StoneController extends BaseController
{
    /**
     * Display a listing of stones.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $stones = Stone::all(); // Optionally add pagination or filtering
        return $this->render('Stones/Index', ['stones' => $stones]);
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
