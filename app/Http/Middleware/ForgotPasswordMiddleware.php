<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class ForgotPasswordMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $email = $request->input('email');

        $user = User::where('email',$email)->first();

        if(!$user) {
            return redirect('/forgot-password')->withErrors([
                'email' => 'Invalid email',
            ])->withInput();
        } 
        redirect('');


        return $next($request);
    }
}
