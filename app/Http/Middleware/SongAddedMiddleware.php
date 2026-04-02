<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SongAddedMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Εκτέλεση controller action
        $response = $next($request);

        // Μόνο για το route που προσθέτει τραγούδι
        if ($request->routeIs('playlists.addSong')) {
            // Redirect πίσω στην προηγούμενη σελίδα (referer)
            return redirect()->back();
        }

        // Στις υπόλοιπες περιπτώσεις αφήνουμε το κανονικό response
        return $response;
    }
}
