<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\PasswordReset;

use App\Models\User;
use App\Http\Controllers\SongController;
use App\Http\Controllers\Api\PlaylistController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controller\Middleware\SongMiddleware;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', fn() => to_route('login'))->middleware(['auth', 'verified']);

Route::get('/login', [AuthController::class, 'create'])
         ->name('login');

Route::post('/login', [AuthController::class, 'login'])->name('auth.create');

Route::get('/register', [AuthController::class, 'register'])
        ->name('register');

Route::post('/register', [AuthController::class, 'registerSubmit'])
    ->name('auth.register');

Route::post('/logout', [AuthController::class, 'destroy'])
     ->middleware('auth')
     ->name('logout');


     
     
Route::middleware('auth:sanctum')->group(function (){
    Route::resource('songs', SongController::class);

    Route::resource('playlists', PlaylistController::class);
    Route::get('/youtube/search', [SongController::class, 'searchYouTube'])->name('youtube.search');
    Route::post('/songs/youtube', [SongController::class, 'storeYouTube'])->name('songs.youtube.store');
    Route::get('/profile', [AuthController::class, 'profile'])->name('profile.show');
    Route::get('playlist/{playlist}', [PlaylistController::class, 'show'])
        ->middleware('playlist')->name('playlist.show');
    Route::post('playlists/createPlaylist', [PlaylistController::class, 'createPlaylist'])
        ->name('playlists.createPlaylist');
    Route::post('playlists/{playlist}/songs', [PlaylistController::class, 'addSong'])
        ->name('playlists.addSong')->middleware('auth','song.added');
    Route::delete('playlists/{playlist}/songs/{song}', [PlaylistController::class, 'removeSong'])
        ->name('playlists.removeSong');
});



Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyNotice');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return Inertia::location('/songs');
})->middleware(['auth','signed'])->name('verification.verify');

// Resend link
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('status', 'Verification link sent!');
})->middleware(['auth','throttle:6,1'])->name('verification.send');



Route::get('/forgot-password', function () {
    return Inertia::render('Auth/ForgotPassword');
})->name('password.request');

Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink($request->only('email'));

    if ($status === Password::RESET_LINK_SENT) {
        return redirect()->route('login')
            ->with('status', 'Σου στείλαμε email για αλλαγή κωδικού.');
    }

    return back()
        ->withErrors(['email' => __($status)])
        ->withInput();
})->middleware('forgot.password');


Route::get('/reset-password/{token}', function (string $token) {
    return Inertia::render('Auth/ResetPassword', ['token' => $token]);
})->name('password.reset');


Route::post('/reset-password', function (Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
    ]);

    $status = Password::reset(
        $request->only('email','password','password_confirmation','token'),
        function (User $user, string $password) {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(10),
            ])->save();

            event(new PasswordReset($user));
        }
    );

    if ($status === Password::PASSWORD_RESET) {
        return redirect()->route('login')
            ->with('status', 'Ο κωδικός άλλαξε με επιτυχία. Κάνε login.');
    }

    return back()
        ->withErrors(['email' => __($status)])
        ->withInput();
})->middleware('check.new.password');