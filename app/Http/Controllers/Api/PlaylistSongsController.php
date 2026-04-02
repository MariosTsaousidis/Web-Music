<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PlaylistSongs;
use App\Models\Playlist;
use App\Models\Song;

class PlaylistSongsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }


    public function index(Request $request)
    {
        $user = $request->user();
        // Βρες την προσωπική playlist
        $playlist = Playlist::where('user_id', $user->id)->firstOrFail();
        // Εξουσιοδότηση
        $this->authorize('view', $playlist);

        // Φέρε όλες τις εγγραφές pivot με eager load Song
        $entries = PlaylistSongs::with('songs')
            ->where('playlist_id', $playlist->id)
            ->get();

        return response()->json(['entries' => $entries], 200);
    }


    public function update(Request $request, $id)
    {
        $entry = PlaylistSongs::findOrFail($id);
        $playlist = $entry->playlist;
        $this->authorize('attachSong', $playlist);

        $data = $request->validate([
            'song_id' => 'required|exists:songs,id',
        ]);

        // Ενημέρωση συνδεδεμένου τραγουδιού
        $entry->song_id = $data['song_id'];
        $entry->save();

        return response()->json(['entry' => $entry], 200);
    }


    public function destroy(Request $request, $id)
    {
        $playlistSong = PlaylistSongs::findOrFail($id);

        $this->authorize('delete', $playlistSong);

        $playlistSong->delete();
        return response()->json(['message' => 'Song removed from playlist successfully.'], 200);
    }
}