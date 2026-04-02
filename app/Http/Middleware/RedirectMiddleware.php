<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Αν ο χρήστης είναι συνδεδεμένος...
        if ($request->user()) {
            // ...και επισκέπτεται τις διαδρομές με όνομα 'login' ή 'register'...
            if ($request->routeIs('login') || $request->routeIs('register')) {
                // ...τον ανακατευθύνουμε στο /songs
                return redirect()->route('songs.index');
            }
        }

        return $next($request);
    }
}
