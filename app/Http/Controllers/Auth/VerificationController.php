<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Auth\Events\Verified;

class VerificationController extends Controller
{
    // Αποστολή του verification email
    public function sendVerificationEmail(Request $request)
    {
        $user = Auth::user();  // Λαμβάνουμε τον τρέχοντα authenticated χρήστη

        // Ελέγχουμε αν ο χρήστης έχει ήδη επιβεβαιώσει το email του
        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified'], 400);
        }

        // Στέλνουμε το verification link
        $user->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification email sent'], 200);
    }

    // Επαλήθευση του email από το link
    public function verifyEmail(Request $request, $id, $hash)
    {
        $user = \App\Models\User::findOrFail($id);

        // Ελέγχουμε αν το hash είναι έγκυρο και αν το email δεν είναι επιβεβαιωμένο
        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified'], 200);
        }

        if ($user->getKey() == $id && hash_equals(sha1($user->getEmailForVerification()), $hash)) {
            $user->markEmailAsVerified();
            event(new Verified($user));

            return response()->json(['message' => 'Email successfully verified'], 200);
        }

        return response()->json(['message' => 'Invalid verification link'], 400);
    }
}
