<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\FoundStoreRequest;
use App\Services\FoundService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FoundController extends Controller
{

    protected FoundService $foundService;

    public function __construct(FoundService $foundService)
    {
        $this->foundService = $foundService;
    }

    public function index(Request $request)
    {
        return $this->index($request);
    }

    public function store(FoundStoreRequest $request)
    {
        $validated = $request->validated();

        try {
            if ($validated) {
                $this->foundService->save($validated);
                return redirect()->route('stones.discover')->with('success', 'Found stone registered successfully!');
            }
            return redirect()->route('stones.discover')->with('error', 'Error registering found stone!');
            ;
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    // FoundController.php
    public function create(Request $request)
    {
        // Attempt to retrieve data from the request or session (fallback)
        $code = $request->input('code', session('code'));
        $stone = $request->input('stone', session('stone'));

        // Check if necessary data is present
        if (!$code || !$stone) {
            // If 'code' or 'stone' is missing, redirect the user to the '/discover' page.
            // This is to ensure that the user is redirected when accessing the page directly without required data
            return redirect('/discover');
        }

        // Store data in session in case of refresh
        session(['code' => $code, 'stone' => $stone]);

        // Pass data to the React view via Inertia
        return Inertia::render('Founds/Create', [
            'code' => $code,
            'stone' => $stone,
        ]);
    }


    public function show(FoundStoreRequest $request)
    {
        return $this->show($request);
    }

    public function update(Request $request)
    {
        return $this->update($request);
    }

    public function destroy(Request $request)
    {
        return $this->destroy($request);
    }



}
