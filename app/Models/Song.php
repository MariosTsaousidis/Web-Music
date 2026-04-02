<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Playlist;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Song extends Model
{
    use HasFactory;

    public static function genres(): array
    {
        return ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Electronic', 'Country'];
    }

    protected $fillable = [
        'title',
        'description',
        'published_at',
        'genre',
        'user_id',
        'file_path',
        'cover_path',
        'youtube_id',
        'source',
        'thumbnail_url'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function playlists() {
        return $this->belongsToMany(
            Playlist::class,
            'playlist_songs',
            'song_id',
            'playlist_id'
        )->withTimestamps();
    }

    public function scopeFilter($query, $filters)
    {
        if (!empty($filters['title'])) {
            $query->where('title', 'like', '%' . $filters['title'] . '%');
        }

        if (!empty($filters['description'])) {
            $query->orWhere('description', 'like', '%' . $filters['description'] . '%');
        }

        if (!empty($filters['search'])) {
            $query->where(function($query) use ($filters) {
                $query->where('title', 'like', '%' . $filters['search'] . '%')
                    ->orWhere('description', 'like', '%' . $filters['search'] . '%')
                    ->orWhereHas('user', function($q) use ($filters) {
                        $q->where('name', 'like', '%' . $filters['search'] . '%');
                    });
            });
        }

        if (!empty($filters['genre'])) {
            $query->where('genre', $filters['genre']);
        }
    
        if (!empty($filters['sort']) && $filters['sort'] === 'latest') {
            $query->orderByDesc('published_at');
        } elseif (!empty($filters['sort']) && $filters['sort'] === 'oldest') {
            $query->orderBy('published_at');
        }
    
        return $query;
    }
}
