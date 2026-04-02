import { usePlayer } from '@/Context/PlayerContext';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
import { useState } from 'react';

export default function FloatingPlayer() {
    const { currentSong, isPlaying, togglePlay, playNext, playPrev, progress, duration } = usePlayer();
    const [expanded, setExpanded] = useState(false);

    if (!currentSong) return null;

    const progressPercent = duration ? (progress / duration) * 100 : 0;

    return (
        <div 
            className="fixed bottom-28 right-8 z-50 transition-all duration-500 ease-in-out"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <div className={`glass-panel overflow-hidden transition-all duration-500 flex items-center ${expanded ? 'w-80 rounded-[30px] p-4' : 'w-20 h-20 rounded-[40px] p-1.5 shadow-[0_0_40px_rgba(29,185,84,0.3)]'}`}>
                
                {/* Rotating Cover / Icon */}
                <div 
                    onClick={togglePlay}
                    className={`relative flex-shrink-0 cursor-pointer transition-all duration-500 ${expanded ? 'w-16 h-16 rounded-2xl shadow-lg' : 'w-17 h-17 rounded-full'} overflow-hidden bg-black/40 flex items-center justify-center`}
                >
                    {currentSong.cover_url ? (
                        <img 
                            src={currentSong.cover_url} 
                            className={`w-full h-full object-cover transition-all duration-[2000ms] ${!expanded && isPlaying ? 'animate-[spin_4s_linear_infinite]' : 'scale-105'}`} 
                        />
                    ) : (
                        <Music className="w-6 h-6 text-white/50" />
                    )}
                    
                    {!expanded && (
                         <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                             {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white translate-x-0.5" />}
                         </div>
                    )}
                </div>

                {/* Expanded Details */}
                <div className={`flex flex-col ml-4 transition-opacity duration-300 overflow-hidden whitespace-nowrap ${expanded ? 'opacity-100 flex-1' : 'opacity-0 w-0'}`}>
                    <h4 className="font-bold text-white text-lg truncate aura-text leading-tight">{currentSong.title}</h4>
                    <p className="text-sm text-white/50 truncate font-medium">{currentSong.user?.name || 'Unknown Artist'}</p>
                    
                    {/* Controls */}
                    <div className="flex items-center space-x-5 mt-2">
                        <button onClick={playPrev} className="text-white/40 hover:text-white transition"><SkipBack className="w-5 h-5 fill-current" /></button>
                        <button onClick={togglePlay} className="text-white hover:scale-110 transition drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                            {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current" />}
                        </button>
                        <button onClick={playNext} className="text-white/40 hover:text-white transition"><SkipForward className="w-5 h-5 fill-current" /></button>
                    </div>
                </div>
                
                {/* Circular Progress Ring (Only visible when collapsed) */}
                {!expanded && (
                    <svg className="absolute inset-0 w-20 h-20 rotate-[-90deg] pointer-events-none">
                        <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                        <circle cx="40" cy="40" r="38" fill="none" stroke="#1db954" strokeWidth="2.5" strokeDasharray="239" strokeDashoffset={239 - (239 * progressPercent) / 100} className="transition-all duration-300" />
                    </svg>
                )}
            </div>
            
            {/* Linear Progress Bar (Visible when expanded) */}
            {expanded && (
                <div className="absolute bottom-1 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#1db954] to-[#29ca9c]" style={{ width: `${progressPercent}%` }}></div>
                </div>
            )}
        </div>
    );
}
