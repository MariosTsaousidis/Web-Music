<?php

namespace App\Policies;

use App\Models\User;
use App\Models\PlaylistSongs;

class PlaylistSongsPolicy
{
    public function view(User $user, PlaylistSongs $playlistSongs)
    {
        return $user->id === $playlistSongs->playlist->user_id || $user->role === 'admin';
    }

    public function delete(User $user, PlaylistSongs $playlistSongs)
    {
        return $user->id === $playlistSongs->playlist->user_id || $user->role === 'admin';
    }

    public function update(User $user, PlaylistSongs $playlistSongs)
    {
        return $user->id === $playlistSongs->playlist->user_id || $user->role === 'admin';
    }
}
