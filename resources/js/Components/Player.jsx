import { usePlayer } from '@/Context/PlayerContext';
import { PlayCircle, PauseCircle, SkipBack, SkipForward, Repeat, Shuffle, Volume2, VolumeX, Mic2, LayoutList, MonitorSpeaker, Music } from 'lucide-react';

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function Player() {
    const { currentSong, isPlaying, volume, progress, duration, togglePlay, seek, changeVolume, playNext, playPrev, isShuffle, toggleShuffle, repeatMode, toggleRepeat } = usePlayer();

    if (!currentSong) {
        return (
            <div className="h-[90px] bg-[#181818] border-t border-[#282828] px-4 flex items-center justify-between relative z-50">
            </div>
        );
    }

    const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
    const volumePercent = volume * 100;

    return (
        <div className="h-[90px] bg-[#181818] border-t border-[#282828] px-4 flex items-center justify-between relative z-50">
            {/* Now Playing */}
            <div className="w-[30%] min-w-[180px] flex items-center space-x-4">
                <div className="w-[56px] h-[56px] bg-[#282828] rounded flex-shrink-0 shadow-lg flex items-center justify-center overflow-hidden">
                    {currentSong.cover_url ? (
                        <img src={currentSong.cover_url} alt="Cover Art" className="w-full h-full object-cover" />
                    ) : (
                        <Music className="w-6 h-6 text-[#b3b3b3]" />
                    )}
                </div>
                <div className="truncate flex flex-col justify-center">
                    <div className="text-white text-sm hover:underline cursor-pointer truncate font-semibold">
                        {currentSong.title}
                    </div>
                    <div className="text-[#b3b3b3] text-xs hover:underline cursor-pointer truncate mt-0.5 font-medium">
                        {currentSong.user?.name || 'Άγνωστος καλλιτέχνης'}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="w-[40%] flex flex-col items-center max-w-[722px]">
                <div className="flex items-center space-x-6 mb-1">
                    <button onClick={toggleShuffle} className={`${isShuffle ? 'text-[#1db954] hover:text-[#3be072]' : 'text-[#b3b3b3] hover:text-white'} transition relative`}>
                        <Shuffle className="w-4 h-4" />
                        {isShuffle && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1db954] rounded-full"></div>}
                    </button>
                    <button onClick={playPrev} className="text-[#b3b3b3] hover:text-white transition"><SkipBack className="w-5 h-5 fill-current" /></button>
                    
                    <button 
                        onClick={togglePlay} 
                        className="text-white hover:scale-105 transition flex items-center justify-center w-8 h-8 rounded-full bg-white text-black"
                    >
                        {isPlaying ? (
                            <PauseCircle className="w-8 h-8 text-black fill-white" />
                        ) : (
                            <PlayCircle className="w-8 h-8 text-black fill-white" />
                        )}
                    </button>
                    
                    <button onClick={playNext} className="text-[#b3b3b3] hover:text-white transition"><SkipForward className="w-5 h-5 fill-current" /></button>
                    <button onClick={toggleRepeat} className={`${repeatMode > 0 ? 'text-[#1db954] hover:text-[#3be072]' : 'text-[#b3b3b3] hover:text-white'} transition relative flex items-center justify-center`}>
                        <Repeat className="w-4 h-4" />
                        {repeatMode === 2 && <span className="absolute text-[8px] font-bold bg-[#181818] rounded-full w-3 h-3 flex items-center justify-center -top-1 -right-1 border border-[#1db954]">1</span>}
                        {repeatMode > 0 && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1db954] rounded-full"></div>}
                    </button>
                </div>
                <div className="w-full flex items-center space-x-2">
                    <span className="text-[11px] font-medium text-[#a7a7a7] min-w-[35px] text-right">{formatTime(progress)}</span>
                    <div 
                        className="h-1 bg-[#4d4d4d] rounded-full flex-1 group flex items-center cursor-pointer relative"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pos = (e.clientX - rect.left) / rect.width;
                            seek(pos * duration);
                        }}
                    >
                        <div className="h-1 bg-white group-hover:bg-[#1db954] rounded-full relative" style={{ width: `${progressPercent}%` }}>
                            <div className="w-3 h-3 bg-white rounded-full absolute -right-1.5 -top-1 opacity-0 group-hover:opacity-100 shadow-md"></div>
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-[#a7a7a7] min-w-[35px]">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Extra Controls */}
            <div className="w-[30%] min-w-[180px] flex items-center justify-end space-x-4 text-[#b3b3b3] pr-2">
                <Mic2 className="w-4 h-4 hover:text-white transition cursor-pointer" />
                <LayoutList className="w-4 h-4 hover:text-white transition cursor-pointer" />
                <MonitorSpeaker className="w-4 h-4 hover:text-white transition cursor-pointer" />
                <div className="flex items-center space-x-2 group w-[90px]">
                    <button onClick={() => changeVolume(volume === 0 ? 1 : 0)}>
                        {volume === 0 ? <VolumeX className="w-4 h-4 hover:text-white transition cursor-pointer" /> : <Volume2 className="w-4 h-4 hover:text-white transition cursor-pointer" />}
                    </button>
                    <div 
                        className="h-1 bg-[#4d4d4d] rounded-full flex-1 flex items-center cursor-pointer relative"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pos = (e.clientX - rect.left) / rect.width;
                            changeVolume(Math.max(0, Math.min(1, pos)));
                        }}
                    >
                        <div className="h-1 bg-white group-hover:bg-[#1db954] rounded-full relative" style={{ width: `${volumePercent}%` }}>
                            <div className="w-3 h-3 bg-white rounded-full absolute -right-1.5 -top-1 opacity-0 group-hover:opacity-100 shadow-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
