<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Song;
use App\Models\User;

class ImportSongs extends Command
{
    protected $signature = 'songs:import';
    protected $description = 'Mass import songs from storage/app/public/import parsing their ID3 tags';

    public function handle()
    {
        $this->info('Starting mass import of songs...');

        if (!class_exists('getID3')) {
            $this->error('The getID3 library is missing! Please run: composer require james-heinrich/getid3');
            return 1;
        }

        $importDisk = Storage::disk('public');
        $importFolder = 'import';
        
        if (!$importDisk->exists($importFolder)) {
            $importDisk->makeDirectory($importFolder);
            $this->info("Created '$importFolder' folder in storage/app/public/. Please drop your .mp3s there and run again.");
            return 0;
        }

        $files = $importDisk->files($importFolder);
        $audioFiles = array_filter($files, function($file) {
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            return in_array($ext, ['mp3', 'wav', 'm4a', 'ogg']);
        });

        if (empty($audioFiles)) {
            $this->info("No audio files found in storage/app/public/import/.");
            return 0;
        }

        // Get the system admin or first user to assign ownership
        $user = User::where('role', 'admin')->first() ?? User::first();
        if (!$user) {
            $this->error('No users found in database to assign songs to! Please register first.');
            return 1;
        }

        $getID3 = new \getID3;
        $getID3->setOption(array('encoding'=>'UTF-8'));
        
        $count = 0;

        foreach ($audioFiles as $file) {
            $absolutePath = $importDisk->path($file);
            $fileInfo = $getID3->analyze($absolutePath);
            \getid3_lib::CopyTagsToComments($fileInfo);

            $filename = pathinfo($file, PATHINFO_BASENAME);
            $this->info("Processing: $filename");

            // Extract metadata
            $title = $fileInfo['comments']['title'][0] ?? pathinfo($file, PATHINFO_FILENAME);
            $artist = $fileInfo['comments']['artist'][0] ?? 'Unknown Artist';
            $genre = $fileInfo['comments']['genre'][0] ?? \App\Models\Song::genres()[0];
            
            // Move Audio File
            $newAudioPath = 'songs/' . Str::uuid() . '_' . $filename;
            $importDisk->move($file, $newAudioPath);

            // Extract Cover Image if exists
            $coverPath = null;
            if (isset($fileInfo['comments']['picture'][0])) {
                $picture = $fileInfo['comments']['picture'][0];
                $extension = 'jpg';
                if ($picture['image_mime'] == 'image/png') $extension = 'png';
                if ($picture['image_mime'] == 'image/webp') $extension = 'webp';

                $coverFilename = 'covers/' . Str::uuid() . '.' . $extension;
                $importDisk->put($coverFilename, $picture['data']);
                $coverPath = $coverFilename;
            }

            // Create Database Record
            Song::create([
                'title' => $title,
                'description' => 'Imported automatically. Artist: ' . $artist,
                'genre' => $genre,
                'published_at' => now(),
                'user_id' => $user->id,
                'file_path' => $newAudioPath,
                'cover_path' => $coverPath
            ]);

            $count++;
        }

        $this->info("Successfully imported $count songs!");
        return 0;
    }
}
