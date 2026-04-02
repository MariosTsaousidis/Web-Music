import { Head, router } from '@inertiajs/react';
import AuraLayout from '@/Layouts/AuraLayout';
import { Play, Pause, Trash2, Download, CheckCircle2, Music } from 'lucide-react';
import { usePlayer } from '@/Context/PlayerContext';
import { useState, useEffect } from 'react';

export default function Show({ playlist, songs }) {
    const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();

    const isPlaylistPlaying = songs?.some(s => s.id === currentSong?.id) && isPlaying;

    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isDownloaded, setIsDownloaded] = useState(false);

    useEffect(() => {
        if (songs?.length > 0 && 'caches' in window) {
            window.caches.open('music-cache').then(async cache => {
                let cachedCount = 0;
                for (const song of songs) {
                    if (!song.file_url) continue;
                    const match = await cache.match(song.file_url);
                    if (match) cachedCount++;
                }
                setIsDownloaded(cachedCount === songs.filter(s => s.file_url).length && cachedCount > 0);
            });
        }
    }, [songs]);

    const downloadPlaylist = async () => {
        if (!('caches' in window)) {
            alert("Η Offline λήψη απαιτεί ασφαλή σύνδεση (HTTPS) ή localhost σύμφωνα με τους κανόνες του Browser.");
            return;
        }

        setDownloading(true);
        setDownloadProgress(0);
        try {
            const cache = await window.caches.open('music-cache');
            const validSongs = songs.filter(s => s.file_url);
            
            for (let i = 0; i < validSongs.length; i++) {
                const song = validSongs[i];
                await cache.add(new Request(song.file_url));
                if (song.cover_url) {
                    await cache.add(new Request(song.cover_url));
                }
                setDownloadProgress(Math.round(((i + 1) / validSongs.length) * 100));
            }
            setIsDownloaded(true);
        } catch (e) {
            console.error("Failed to download playlist", e);
        } finally {
            setDownloading(false);
        }
    };

    const handlePlayAll = () => {
        if (songs?.length > 0) {
            playSong(songs[0], songs);
        }
    };

    const removeFromPlaylist = (songId) => {
        router.delete(`/playlists/${playlist.id}/songs/${songId}`, {
            preserveScroll: true
        });
    };

    return (
        <div className="px-6 md:px-12 w-full max-w-7xl mx-auto min-h-screen">
            <Head title={playlist.name} />
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end space-y-6 md:space-y-0 md:space-x-12 mb-16 mt-8">
                {/* Visual Representation of Playlist */}
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.1)] relative flex-shrink-0 animate-[spin_20s_linear_infinite]">
                    {songs?.[0]?.cover_url ? (
                        <>
                            <img src={songs[0].cover_url} className="w-full h-full object-cover blur-xl opacity-80 scale-125" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img src={songs[0].cover_url} className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-2xl" />
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full glass-panel flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                <Music className="w-10 h-10 text-white/40" />
                            </div>
                        </div>
                    )}
                    {/* The center vinyl hole */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-4 h-4 bg-[#0f0f13] rounded-full border border-white/20"></div>
                    </div>
                </div>

                {/* Playlist Info */}
                <div className="flex flex-col z-10 w-full relative">
                    <span className="text-white/40 font-bold tracking-widest text-sm uppercase mb-2">Mix Volume</span>
                    <h1 className="text-5xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tighter truncate max-w-full pb-2">
                        {playlist.name}
                    </h1>
                    <div className="flex items-center space-x-4 mt-6">
                        <button 
                            onClick={handlePlayAll}
                            className="bg-white text-black pl-6 pr-8 py-3.5 rounded-full font-bold flex items-center space-x-2 hover:scale-105 active:scale-95 transition duration-300 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                        >
                            {isPlaylistPlaying ? (
                                <><Pause className="w-5 h-5 fill-current" /> <span>PAUSE</span></>
                            ) : (
                                <><Play className="w-5 h-5 fill-current" /> <span>PLAY</span></>
                            )}
                        </button>

                        <button 
                            onClick={isDownloaded ? null : downloadPlaylist}
                            disabled={downloading}
                            className={`px-5 py-3.5 rounded-full flex items-center space-x-2 transition duration-300 border glass-panel ${
                                isDownloaded 
                                ? 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10' 
                                : 'text-white/70 border-white/10 hover:border-white/50 hover:text-white'
                            }`}
                        >
                            {downloading ? (
                                <span className="font-bold text-sm tracking-wide text-white">ΛΗΨΗ {downloadProgress}%</span>
                            ) : isDownloaded ? (
                                <><CheckCircle2 className="w-5 h-5" /> <span className="text-sm font-bold tracking-widest uppercase">Downloaded</span></>
                            ) : (
                                <><Download className="w-5 h-5" /> <span className="text-sm font-bold tracking-widest uppercase">Download</span></>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Songs Stacked View */}
            <div className="flex flex-col space-y-4">
                {songs?.length > 0 ? songs.map((song, idx) => {
                    const isCurrentSong = currentSong?.id === song.id;
                    const isActive = isCurrentSong && isPlaying;
                    
                    return (
                        <div 
                            key={song.id} 
                            onClick={() => isCurrentSong ? togglePlay() : playSong(song, songs)}
                            className={`group glass-panel flex items-center p-3 rounded-3xl cursor-pointer transition-all duration-300 ${isCurrentSong ? 'bg-white/10 shadow-[0_0_40px_rgba(29,185,84,0.15)] border-[#1db954]/40' : 'hover:bg-white/5 hover:translate-x-2'}`}
                        >
                            <span className="w-12 text-center font-black text-xl text-white/20 group-hover:text-white/40 transition">
                                {idx + 1}
                            </span>
                            
                            <div className="w-16 h-16 rounded-2xl overflow-hidden mx-4 relative flex-shrink-0 shadow-lg">
                                {song.cover_url ? <img src={song.cover_url} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-black/40 flex items-center justify-center"><Music className="w-6 h-6 text-white/30" /></div>}
                                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition opacity-0 group-hover:opacity-100 ${isCurrentSong ? 'opacity-100' : ''}`}>
                                    {isActive ? <Pause className="w-6 h-6 fill-white text-white" /> : <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />}
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-hidden pr-4">
                                <h3 className={`font-bold text-lg md:text-xl truncate tracking-tight transition-colors ${isCurrentSong ? 'text-[#1db954]' : 'text-white'}`}>{song.title}</h3>
                                <p className="text-white/50 text-sm font-medium truncate mt-0.5">{song.user?.name || 'Unknown'}</p>
                            </div>
                            
                            <div className="px-4">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); removeFromPlaylist(song.id); }}
                                    className="p-3 glass-panel border-0 bg-white/5 rounded-full text-white/30 hover:text-rose-400 hover:bg-rose-400/20 hover:shadow-[0_0_20px_rgba(225,29,72,0.3)] transition-all opacity-0 group-hover:opacity-100"
                                    title="Αφαίρεση κομματιού"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="glass-panel rounded-[2rem] p-16 text-center border-dashed border-white/20">
                        <h2 className="text-3xl font-black aura-text mb-4">Άδειο Studio</h2>
                        <p className="text-white/50 font-medium text-lg">Πρόσθεσε τραγούδια για να δημιουργήσεις τον μοναδικό σου ήχο.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

Show.layout = page => <AuraLayout>{page}</AuraLayout>;
