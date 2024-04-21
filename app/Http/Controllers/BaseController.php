<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

/**
 * Class BaseController
 * @package App\Http\Controllers
 * Base controller for all Inertia responses.
 */
class BaseController extends Controller
{
    /**
     * Render a view using Inertia.
     *
     * @param string $component
     * @param array $props
     * @return \Inertia\Response
     */
    protected function render($component, $props = [])
    {
        return Inertia::render($component, $props);
    }

    /**
     * Send an error response using Inertia.
     *
     * @param string $message
     * @param array $props Additional properties
     * @return \Inertia\Response
     */
    protected function sendError($message, array $props = [])
    {
        // Getting the name of the class that inherits BaseController
        $className = get_called_class();
        // Getting the function name from which sendError was called
        $backtrace = debug_backtrace();
        $functionName = $backtrace[1]['function']; // The function that called sendError

        $fullMessage = "Error in $className::$functionName: $message";
        return Inertia::render('Error', array_merge($props, ['message' => $fullMessage]));
    }
}
