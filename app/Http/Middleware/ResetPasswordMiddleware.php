<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class ResetPasswordMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $newPassword = $request->input('password');

        $user = User::where('email', $request->input('email'))->first();

        if (Hash::check($newPassword, $user->password)) {
            return redirect()->back()->withErrors([
                'password' => 'New password can not be the same.'
            ])->withInput();
        }

        return $next($request);
    }
}
