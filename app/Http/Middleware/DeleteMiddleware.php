<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DeleteMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $song = $request->route('song');
        $user = $request->user();
        if (!$user || ($user->id !== $song->user_id && $user->role !== 'admin')) {
            return redirect()->back()->with([
                'error' => 'Δεν έχεις δικαίωμα για διαγραφή/τροποποίηση.'
            ]);
        }

        return $next($request);
    }
}
