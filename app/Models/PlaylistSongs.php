<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlaylistSongs extends Model
{
    use HasFactory;

    protected $table = 'playlist_songs';
    protected $fillable = ['playlist_id', 'song_id'];

    public function playlist() {
        return $this->belongsTo(Playlist::class);
    }

    public function songs() {
        return $this->belongsTo(Song::class, 'song_id');
    }
}
