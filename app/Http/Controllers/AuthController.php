<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{   
    public function __construct()
    {
        $this->middleware('redirect')->only('login','register', 'create', 'registerSubmit');
    }
    
    public function create()
    {
        return inertia('Auth/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();
            return redirect()->intended('/songs');
        }

        return redirect()->back()
            ->withErrors(['email' => 'Invalid credentials']);
    }

    public function register()
    {
        return inertia('Auth/Register');
    }

    public function registerSubmit(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        return redirect()->route('verification.notice');
    }

    public function profile()
    {
        $user = Auth::user();
        return inertia('Profile/Show', [
            'user' => $user,
            'stats' => [
                'songs_count' => $user->songs()->count(),
                'playlists_count' => $user->playlists()->count(),
            ]
        ]);
    }

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return to_route('login');
    }
}