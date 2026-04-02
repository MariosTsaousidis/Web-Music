<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Playlist;
use App\Models\Song;

class PlaylistController extends Controller
{
    public function __construct()
    {
        $this->middleware('playlist')->only(['show','update']);
    }
    
    public function index()
    {
        // Λήψη του τρέχοντος χρήστη
        $user = auth()->user();
        
        // Εμφάνιση μόνο των playlists του χρήστη αν είναι κανονικός χρήστης
        if ($user->role === 'admin') {
            $playlists = Playlist::with('user')->latest()->get();  // Οι Admins βλέπουν όλες τις playlists
        } else {
            $playlists = $user->playlists()->with('user')->latest()->get();  // Οι κανονικοί χρήστες βλέπουν μόνο τις δικές τους playlists
        }

        return inertia('Playlists/Index', compact('playlists'));
    }

    // Εμφάνιση λεπτομερειών για μια playlist
    public function show(Request $request, $id)
    {
        $user = $request->user();

        // Βρες ή δημιούργησε personal playlist
        $playlist = Playlist::with('user')->findOrFail($id);

        if ($user->role !== 'admin' && $playlist->user_id !== $user->id) {
            $personal = Playlist::where('user_id', $user->id)->first();

            // Redirect στον δικό του playlist αν υπάρχει, αλλιώς κάπου αλλού
            return redirect()->route('playlists.show', $personal->id ?? '');
        }

        // Εξουσιοδότηση: μόνο owner ή admin
        $this->authorize('view', $playlist);

        // Φόρτωσε songs με URLs
        $songs = collect($playlist->songs()->with('user')->get())->map(function($song) {
            $song->file_url = $song->file_path ? asset('storage/' . $song->file_path) : null;
            $song->cover_url = $song->cover_path ? asset('storage/' . $song->cover_path) : null;
            return $song;
        });

        // Όλες οι λίστες του χρήστη (για το Sidebar)
        $playlists = $user->playlists()->select('id','name')->get()->toArray();

        return inertia('Playlists/Show', [
            'playlist' => $playlist, 
            'songs' => $songs,
            'playlists' => $playlists
        ]);
    }

    public function addSong(Request $request, $id)
    {
        $user = $request->user();

        $playlist = Playlist::where('user_id', $user->id)->findOrFail($id);

        $this->authorize('update', $playlist);

        $request->validate([
            'song_id' => 'required|exists:songs,id'
        ]);

        $playlist->songs()->syncWithoutDetaching($request->song_id);

        return redirect()->back()->with('success', 'Το τραγούδι προστέθηκε στην playlist!');
    }

    public function attachSong(Request $request)
    {
        $request->validate([
            'song_id' => 'required|exists:songs,id',
        ]);

        $user = $request->user();
        $playlist = Playlist::firstOrCreate(
            ['user_id' => $user->id],
            ['name' => 'My Personal Playlist']
        );

        $this->authorize('attachSong', $playlist);

        $request->validate(['song_id' => 'required|exists:songs,id']);

        $playlist->songs()->syncWithoutDetaching($request->song_id);

        return redirect()->back()->with('success', 'Το τραγούδι προστέθηκε στην playlist!');
    }

    public function removeSong($playlistId, $songId)
    {
        $playlist = Playlist::findOrFail($playlistId);
        $this->authorize('update', $playlist);
        $playlist->songs()->detach($songId);

        return redirect()->back()->with('success', 'Το τραγούδι αφαιρέθηκε.');
    }

    public function update(Request $request, Playlist $playlist)
    {
        // $playlist = Playlist::findOrFail($id);

        $this->authorize('update', $playlist);

        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $playlist->update($data);

        return redirect()->route('playlists.show', $playlist)
                     ->with('success', 'H playlist ανανεώθηκε επιτυχώς.');
    }

    public function edit(Playlist $playlist)
    {
        $this->authorize('update', $playlist);
        return inertia('Playlists/Edit', [
            'playlist' => $playlist,
        ]);
    }

    public function createPlaylist(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|max:255',
        ]);

        // Βρες ή δημιούργησε personal playlist
        $playlist = auth()->user()->playlists()->create($validated);

        // return response()->json(['playlist' => $playlist], 201);
        return redirect('playlists');
    }

    public function create()
    {
        $this->authorize('create',Playlist::class);
        return inertia('Playlists/Create');
    }

    public function selectPlaylist(Request $request, $id = null)
    {
        $user = auth()->user();

        if(!$id){
            $playlist = $user->playlists()->with('songs')->first();
        } else {
            $playlist = Playlist::with('songs')->where('id',$id)
                ->where('user_id', $user->id)
                ->firstOrFail();
        }

        return response()->json([
            'playlist' => $playlist
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $playlist = Playlist::findOrFail($id);

        $this->authorize('delete', $playlist);

        $playlist->delete();
        return redirect()->back();
    }
}
