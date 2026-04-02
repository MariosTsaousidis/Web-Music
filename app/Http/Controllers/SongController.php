<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Song;
use App\Models\Playlist;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


use App\Services\YouTubeService;

class SongController extends Controller
{
    protected $youtube;

    public function __construct(YouTubeService $youtube)
    {
        $this->youtube = $youtube;
        $this->middleware('delete')->only('destroy','edit');
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Song::class);

        $query = Song::with('user')
            ->where(function($q) {
                $q->whereNotNull('file_path')
                  ->orWhereNotNull('youtube_id');
            })

            ->when($request->filled('genre'), function ($q) use ($request) {
                $q->where('genre', $request->genre);
            })

            ->when($request->filled('search'), function ($q) use ($request) {
                $search = $request->search;
                $q->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('genre', 'like', "%{$search}%")
                    ->orWhereHas('user', fn($q) => 
                        $q->where('name', 'like', "%{$search}%")
                    );
                });
            })

            ->orderBy('published_at', 'desc');

        $songs = $query->paginate(12)
            ->through(fn($song) => [
                'id'           => $song->id,
                'title'        => $song->title,
                'description'  => $song->description,
                'genre'        => $song->genre,
                'published_at' => $song->published_at,
                'file_url'     => $song->file_path ? asset('storage/' . $song->file_path) : null,
                'cover_url'    => $song->cover_path ? asset('storage/' . $song->cover_path) : ($song->thumbnail_url ?: null),
                'youtube_id'   => $song->youtube_id,
                'source'       => $song->source,
                'user' => [
                    'id'   => $song->user->id,
                    'name' => $song->user->name,
                ],
            ]);

        $youtubeResults = [];
        if ($request->filled('search')) {
            $youtubeResults = $this->youtube->search($request->search);
        }

        
        $playlists = $request->user()
            ->playlists()
            ->select('id','name')
            ->get()
            ->toArray();

        return inertia('Songs/Index', [
            'songs'   => $songs,
            'playlists' => $playlists,
            'filters' => $request->only(['search', 'genre']),
            'youtubeResults' => $youtubeResults,
        ]);
    }

    public function searchYouTube(Request $request)
    {
        $query = $request->input('query');
        if (!$query) return response()->json([]);
        
        $results = $this->youtube->search($query);
        return response()->json($results);
    }

    public function storeYouTube(Request $request)
    {
        $this->authorize('create', Song::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'youtube_id' => 'required|string',
            'thumbnail_url' => 'nullable|url',
            'description' => 'nullable|string',
        ]);

        $existing = Song::where('youtube_id', $validated['youtube_id'])->first();
        if ($existing) {
             return redirect()->back()->with('success', 'Αυτό το τραγούδι υπάρχει ήδη στην αύρα σου!');
        }

        $user = $request->user();
        $song = $user->songs()->create([
            'title' => $validated['title'],
            'youtube_id' => $validated['youtube_id'],
            'thumbnail_url' => $validated['thumbnail_url'],
            'description' => $validated['description'] ?? 'Imported from YouTube',
            'source' => 'youtube',
            'published_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Προστέθηκε στην αύρα σου!');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Song::class);

        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'genre' => ['nullable', Rule::in(Song::genres())],
            'published_at' => 'required|date',
            'description'  => 'nullable|string',
            'file'         => 'required|file|mimes:mp3,wav,m4a,ogg',
            'cover_image'  => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096'
        ]);

        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('songs', 'public');
        }

        if ($request->hasFile('cover_image')) {
            $validated['cover_path'] = $request->file('cover_image')->store('covers', 'public');
        }

        $user = $request->user();
        $song = $user->songs()->create($validated); // Δημιουργείται με user_id

        $playlist = Playlist::firstOrCreate(
            ['user_id' => $user->id], 
            ['name' => 'My Personal Playlist']
        );

        // Σύνδεσε το τραγούδι με την playlist
        $playlist->songs()->attach($song->id);

        return redirect('songs');
    }

    public function create(Request $request)
    {
        $this->authorize('create', Song::class);
        $playlists = $request->user()->playlists()->select('id','name')->get()->toArray();
        return inertia('Songs/Create', [
            'genres' => Song::genres(),
            'playlists' => $playlists
        ]);
    }

    public function update(Request $request, Song $song)
    {
        // $song = Song::findOrFail($id);
        $user = $request->user();

        // Επιτρέπεται να επεξεργαστεί μόνο ο δημιουργός ή admin
        $this->authorize('update', $song);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'genre' => ['nullable', Rule::in(Song::genres())],
            'published_at' => 'nullable|date',
        ]);

        $song->update($validated);

        return redirect()->route('songs.index', $song)
                     ->with('success', 'Το τραγούδι ενημερώθηκε.');
    }

    public function edit(Song $song)
    {
        $this->authorize('update',$song);
        return inertia('Songs/Edit', [
            'song' => $song,
            'genres' => Song::genres(),
        ]);
        
    }

    public function destroy(Song $song)
    {
        // $song = Song::findOrFail($id);
        $user = auth()->user();

        $this->authorize('delete', $song);
        $song->delete();

        return redirect()->route('songs.index')->with('success', 'Το τραγούδι διαγράφηκε με επιτυχία.');
        // return response()->json(null, 204);
    }

    public function show($id)
    {
        $user = auth()->user();

        $song = Song::findOrFail($id);

        if ($user->role !== 'admin' && $song->user_id !== $user->id) {

            // Redirect στον δικό του playlist αν υπάρχει, αλλιώς κάπου αλλού
            return redirect()->route('songs.index')->with('error', 'Δεν έχετε δικαίωμα να δείτε αυτό το τραγούδι.');
        }

        // Εξουσιοδότηση: Αν ο χρήστης μπορεί να δει το τραγούδι
        $this->authorize('view', $song);

        // Πέρασε την μεταβλητή $song στην προβολή
        // API return response()->json(['song' => $song], 200);
        $song->load(['user.songs']);

        return inertia('Songs/Show', [
            'song' => $song,
        ]);
    }

}
