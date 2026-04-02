<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Marios Tsaou',
            'email' => 'marios@tsaou.com',
            'role' => 'admin',
        ]);

        // \App\Models\User::factory(300)->create();
        // \App\Models\Song::factory(1000)->create();

        User::factory(20)->create();
        
        $users = User::all();

        foreach ($users as $user) {
            \App\Models\Song::factory(5)->create([
                'user_id' => $user->id
            ]);
        }

        foreach ($users as $user) {
            \App\Models\Playlist::factory()->create([
                'user_id' => $user->id,
            ]);
        }

       
        $playlists = \App\Models\Playlist::all()->shuffle();

        foreach ($playlists as $playlist){
            $songs = \App\Models\Song::inRandomOrder()->take(rand(0,10))->get();

            foreach($songs as $song){
                \App\Models\PlaylistSongs::factory()->create([

                    'playlist_id' => $playlist->id,
                    'song_id' => $song->id,
                ]);
            }
        }

        

        // $this->call(
        //     PlaylistSeeder::class,
        //     // PlaylistSongsSeeder::class
        // );

        // $this->call(
        //     // PlaylistSeeder::class,
        //     PlaylistSongsSeeder::class
        // );

        // \App\Models\Song::factory(50)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
