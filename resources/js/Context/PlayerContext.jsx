import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const PlayerContext = createContext();

export function usePlayer() {
    return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
    const [queue, setQueue] = useState([]);
    const [originalQueue, setOriginalQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
    
    const audioRef = useRef(null);
    const youtubeRef = useRef(null);

    // Update current song when index/queue changes
    useEffect(() => {
        if (currentIndex >= 0 && queue.length > 0) {
            const nextSong = queue[currentIndex];
            if (currentSong?.id !== nextSong.id) {
                setCurrentSong(nextSong);
            }
        }
    }, [currentIndex, queue]);

    const playSong = (song, playlistQueue = null) => {
        if (playlistQueue && playlistQueue.length > 0) {
            setOriginalQueue(playlistQueue);
            
            let finalQueue = [...playlistQueue];
            if (isShuffle) {
                finalQueue = finalQueue.sort(() => Math.random() - 0.5);
                // Ensure selected song is first
                const songIndex = finalQueue.findIndex(s => s.id === song.id);
                if (songIndex > -1) {
                    finalQueue.splice(songIndex, 1);
                    finalQueue.unshift(song);
                }
            }
            
            setQueue(finalQueue);
            setCurrentIndex(finalQueue.findIndex(s => s.id === song.id));
        } else {
            // Just playing a single song manually from somewhere
            if (!queue.find(s => s.id === song.id)) {
                setQueue([song]);
                setOriginalQueue([song]);
                setCurrentIndex(0);
            } else {
                setCurrentIndex(queue.findIndex(s => s.id === song.id));
            }
        }
        
        if (currentSong?.id === song.id) {
            togglePlay();
        } else {
            // Stop current source if switching types
            if (currentSong?.youtube_id && !song.youtube_id) {
                // Moving from YT to Local
                setIsPlaying(false);
            } else if (!currentSong?.youtube_id && song.youtube_id) {
                // Moving from Local to YT
                if (audioRef.current) audioRef.current.pause();
            }

            setCurrentSong(song);
            setIsPlaying(true);
        }
    };

    const togglePlay = () => {
        if (!currentSong) return;
        
        const newPlaying = !isPlaying;
        setIsPlaying(newPlaying);
        
        if (!currentSong.youtube_id && audioRef.current) {
            if (newPlaying) {
                audioRef.current.play().catch(e => console.error(e));
            } else {
                audioRef.current.pause();
            }
        }
    };

    const handleProgress = (state) => {
        setProgress(state.playedSeconds);
    };

    const handleDuration = (dur) => {
        setDuration(dur);
    };

    const playNext = () => {
        if (queue.length === 0) return;
        
        let nextIndex = currentIndex + 1;
        if (nextIndex >= queue.length) {
            if (repeatMode === 1) {
                nextIndex = 0; // loop all
            } else {
                setIsPlaying(false);
                return; // stop
            }
        }
        setCurrentIndex(nextIndex);
        setIsPlaying(true);
    };

    const playPrev = () => {
        if (queue.length === 0) return;
        
        // If more than 3 seconds in, restart current song instead of prev
        if (progress > 3) {
            seek(0);
            return;
        }

        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            if (repeatMode === 1) {
                prevIndex = queue.length - 1;
            } else {
                seek(0);
                return;
            }
        }
        setCurrentIndex(prevIndex);
        setIsPlaying(true);
    };

    const handleEnded = () => {
        if (repeatMode === 2) {
            // Loop current song
            seek(0);
            if (!currentSong.youtube_id && audioRef.current) {
                audioRef.current.play();
            }
        } else {
            playNext();
        }
    };

    const toggleShuffle = () => {
        const newShuffle = !isShuffle;
        setIsShuffle(newShuffle);
        
        if (newShuffle && queue.length > 0) {
            const current = queue[currentIndex];
            const remaining = queue.filter(s => s.id !== current.id);
            const shuffled = remaining.sort(() => Math.random() - 0.5);
            setQueue([current, ...shuffled]);
            setCurrentIndex(0);
        } else if (!newShuffle && originalQueue.length > 0) {
            setQueue([...originalQueue]);
            if (currentSong) {
                setCurrentIndex(originalQueue.findIndex(s => s.id === currentSong.id));
            }
        }
    };

    const toggleRepeat = () => {
        // 0 -> 1 -> 2 -> 0
        setRepeatMode((prev) => (prev + 1) % 3);
    };

    const seek = (time) => {
        setProgress(time);
        if (currentSong?.youtube_id && youtubeRef.current) {
            youtubeRef.current.seekTo(time);
        } else if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    const changeVolume = (newVolume) => {
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <PlayerContext.Provider
            value={{
                currentSong,
                isPlaying,
                volume,
                progress,
                duration,
                playSong,
                togglePlay,
                seek,
                changeVolume,
                playNext,
                playPrev,
                isShuffle,
                toggleShuffle,
                repeatMode,
                toggleRepeat
            }}
        >
            {children}
            
            {/* Engine A: Native Audio (Extremely stable for Local Files) */}
            <audio
                ref={audioRef}
                src={!currentSong?.youtube_id ? currentSong?.file_url : null}
                onTimeUpdate={(e) => !currentSong?.youtube_id && setProgress(e.target.currentTime)}
                onDurationChange={(e) => !currentSong?.youtube_id && setDuration(e.target.duration)}
                onEnded={handleEnded}
            />

            {/* Engine B: YouTube (For Streams) */}
            <div style={{ position: 'fixed', bottom: '10px', right: '10px', width: '1px', height: '1px', opacity: '0.01', pointerEvents: 'none', zIndex: '9999', overflow: 'hidden' }}>
                <ReactPlayer
                    key={currentSong?.id || 'empty'}
                    ref={youtubeRef}
                    url={currentSong?.youtube_id ? `https://www.youtube.com/watch?v=${currentSong.youtube_id}` : null}
                    playing={isPlaying && !!currentSong?.youtube_id}
                    volume={volume}
                    muted={false}
                    onProgress={(state) => currentSong?.youtube_id && handleProgress(state)}
                    onDuration={(dur) => currentSong?.youtube_id && handleDuration(dur)}
                    onEnded={handleEnded}
                    config={{
                        youtube: {
                            playerVars: { 
                                autoplay: 0,
                                controls: 0,
                                modestbranding: 1,
                                rel: 0,
                                showinfo: 0
                            }
                        }
                    }}
                />
            </div>
        </PlayerContext.Provider>
    );
}
