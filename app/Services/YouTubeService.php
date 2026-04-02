<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class YouTubeService
{
    public function search($query)
    {
        $response = Http::get('https://www.googleapis.com/youtube/v3/search', [
            'part' => 'snippet',
            'q' => $query,
            'key' => config('services.youtube.key'),
            'maxResults' => 100,
            'type' => 'video'
        ]);

        if (!$response->successful()) {
            return [];
        }

        return collect($response->json()['items'])->map(function ($item) {
            return [
                'id' => $item['id']['videoId'],
                'title' => $item['snippet']['title'],
                'thumbnail' => $item['snippet']['thumbnails']['default']['url'] ?? null,
                'author' => $item['snippet']['channelTitle'],
                'source' => 'youtube'
            ];
        })->toArray();
    }
}
