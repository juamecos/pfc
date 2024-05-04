<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use App\Services\BaseService;

/**
 * Class BaseController
 * @package App\Http\Controllers
 * Base controller for all Inertia responses.
 */
class BaseController extends Controller
{
    protected BaseService $service;

    public function __construct(BaseService $service)
    {
        $this->service = $service;
    }

    /**
     * Render a view using Inertia.
     *
     * @param string $component
     * @param array $props
     * @return Response
     */
    protected function render(string $component, array $props = []): Response
    {
        return Inertia::render($component, $props);
    }

    /**
     * Send a redirect response.
     *
     * @param string $route
     * @param array $parameters
     * @return RedirectResponse
     */
    protected function redirect(string $route, array $parameters = []): RedirectResponse
    {
        return Redirect::route($route, $parameters);
    }

    /**
     * Send a JSON error response for use with Inertia.
     *
     * @param string $message
     * @return JsonResponse
     */
    protected function sendError(string $message): JsonResponse
    {
        // Log the error
        $className = get_called_class();
        $backtrace = debug_backtrace();
        $functionName = $backtrace[1]['function'];
        $fullMessage = "Error in $className::$functionName: $message";
        Log::error($fullMessage);

        // Flash error message to session
        Session::flash('error', $message);

        return response()->json(['success' => false, 'message' => $message], 400);
    }

    /**
     * Send a JSON success response for use with Inertia.
     *
     * @param string $message
     * @param array $props
     * @return JsonResponse
     */
    protected function sendSuccess(string $message, array $props = []): JsonResponse
    {
        return response()->json(array_merge(['success' => true, 'message' => $message], $props));
    }
}
