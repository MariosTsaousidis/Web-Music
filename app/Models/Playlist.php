<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Song;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Playlist extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function songs() {
        return $this->belongsToMany(
            Song::class,
            'playlist_songs',
            'playlist_id',
            'song_id'
        )->withTimestamps();
    }
}
