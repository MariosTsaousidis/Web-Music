import { Head } from '@inertiajs/react';
import AuraLayout from '@/Layouts/AuraLayout';
import { Play, Pause, Music, MoreHorizontal, Plus, Search as SearchIcon, Sparkles, TrendingUp } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { router, Link, usePage } from '@inertiajs/react';
import { usePlayer } from '@/Context/PlayerContext';

export default function Index({ songs, playlists, youtubeResults = [] }) {
    const { auth } = usePage().props;
    const { playSong, togglePlay, currentSong, isPlaying } = usePlayer();
    const { filters } = usePage().props;
    const [openMenuId, setOpenMenuId] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [loadingIds, setLoadingIds] = useState([]);
    const [isAddedNotify, setIsAddedNotify] = useState(null);

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery !== (filters.search || '')) {
                router.get(route('songs.index'), { search: searchQuery }, {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                });
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 5 || hour >= 21) return 'Καληνύχτα';
        if (hour < 12) return 'Καλημέρα';
        return 'Καλησπέρα';
    };

    const addToPlaylist = (playlistId, songId) => {
        router.post(`/playlists/${playlistId}/songs`, { song_id: songId }, {
            preserveScroll: true,
            onSuccess: () => setOpenMenuId(null)
        });
    };

    // Filter valid ones
    const validSongs = songs?.data || [];
    const filteredSongs = validSongs.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const featuredSongs = filteredSongs.slice(0, 4);
    const recentSongs = filteredSongs.slice(4);

    const addYouTubeSong = (video) => {
        setLoadingIds(prev => [...prev, video.id]);
        router.post('/songs/youtube', {
            title: video.title,
            youtube_id: video.id,
            thumbnail_url: video.thumbnail,
            description: `Channel: ${video.author}`,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setLoadingIds(prev => prev.filter(id => id !== video.id));
                setIsAddedNotify(video.title);
                setTimeout(() => setIsAddedNotify(null), 3000);
            },
            onError: () => {
                setLoadingIds(prev => prev.filter(id => id !== video.id));
            }
        });
    };

    return (
        <div className="px-6 md:px-12 w-full max-w-7xl mx-auto">
            <Head title="Ανακάλυψη" />

            {/* Aura Top Nav & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 space-y-6 md:space-y-0">
                <div className="flex flex-col">
                    <span className="text-[#1db954] font-black uppercase tracking-[0.4em] text-xs ml-1 mb-2 animate-pulse flex items-center">
                        <Sparkles className="w-3 h-3 mr-2" /> LIVE STREAMING
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-2xl">
                        {getGreeting()}, <span className="aura-text">{auth.user?.name.split(' ')[0]}</span>
                    </h1>
                </div>

                <div className="relative group max-w-md w-full">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-white/20 group-hover:text-[#1db954] transition-colors" />
                    </div>
                    <input 
                        type="text"
                        placeholder="Αναζήτηση αύρας..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-8 focus:outline-none focus:ring-4 focus:ring-[#1db954]/10 focus:border-[#1db954]/40 transition-all font-medium placeholder-white/10 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Featured Grid Section */}
            {featuredSongs.length > 0 && (
                <div className="mb-16">
                    <div className="flex items-center space-x-3 mb-8">
                        <TrendingUp className="w-6 h-6 text-[#1db954]" />
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase">Featured</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredSongs.map(song => {
                            const isCurrentSong = currentSong?.id === song.id;
                            return (
                                <div 
                                    key={song.id}
                                    className="glass-panel group p-4 rounded-[2rem] relative overflow-hidden cursor-pointer flex flex-col transition-all duration-500 hover:shadow-[0_20px_40px_rgba(29,185,84,0.15)] hover:-translate-y-2"
                                    onClick={() => isCurrentSong ? togglePlay() : playSong(song)}
                                >
                                    <div className="relative aspect-square w-full rounded-[1.5rem] overflow-hidden mb-5 shadow-xl">
                                        {song.cover_url ? (
                                            <img src={song.cover_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                                <Music className="w-12 h-12 text-white/20" />
                                            </div>
                                        )}
                                        {/* Play Overlay */}
                                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                                {isCurrentSong && isPlaying ? (
                                                    <Pause className="w-8 h-8 text-white fill-white" />
                                                ) : (
                                                    <Play className="w-8 h-8 text-white fill-white translate-x-1" />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start px-1">
                                        <div className="flex-1 overflow-hidden">
                                            <h3 className={`font-bold text-lg leading-tight truncate ${isCurrentSong ? 'text-[#1db954]' : 'text-white'}`}>{song.title}</h3>
                                            <p className="text-white/50 text-sm font-medium mt-1 truncate">{song.user?.name || 'Unknown'}</p>
                                        </div>
                                        <div className="relative ml-2" onClick={(e) => e.stopPropagation()}>
                                            <button 
                                                onClick={() => setOpenMenuId(openMenuId === song.id ? null : song.id)}
                                                className="p-2 rounded-full hover:bg-white/10 transition text-white/50 hover:text-white"
                                            >
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                            
                                            {/* Context Menu */}
                                            {openMenuId === song.id && (
                                                <div className="absolute right-0 bottom-full mb-2 w-56 glass-panel rounded-2xl border border-white/10 z-50 py-2 shadow-2xl">
                                                    <div className="px-4 py-2 text-xs font-bold text-white/40 uppercase tracking-widest border-b border-white/5 mb-1">
                                                        Προσθηκη σε Playlist
                                                    </div>
                                                    <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                                        {playlists?.length > 0 ? playlists.map(p => (
                                                            <button 
                                                                key={p.id}
                                                                onClick={(e) => { e.stopPropagation(); addToPlaylist(p.id, song.id); }}
                                                                className="w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 flex items-center space-x-3 transition"
                                                            >
                                                                <Plus className="w-4 h-4 text-[#1db954]" />
                                                                <span className="truncate">{p.name}</span>
                                                            </button>
                                                        )) : (
                                                            <div className="px-4 py-3 text-xs text-white/50">Δεν υπάρχουν playlists.</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* List Format for older/remaining songs */}
            {recentSongs.length > 0 && (
                <div className="pb-12">
                     <h2 className="text-2xl font-black text-white/90 tracking-tight uppercase mb-6 flex items-center">
                         <span className="w-8 h-[2px] bg-[#1db954] mr-4"></span>
                         Discovery
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {recentSongs.map(song => {
                             const isCurrentSong = currentSong?.id === song.id;
                             return (
                                 <div 
                                    key={song.id} 
                                    className="group glass-panel rounded-2xl p-3 flex items-center cursor-pointer hover:bg-white/5 transition duration-300"
                                    onClick={() => isCurrentSong ? togglePlay() : playSong(song)}
                                >
                                     <div className="w-16 h-16 rounded-[14px] overflow-hidden relative shadow-lg mr-4 flex-shrink-0">
                                         {song.cover_url ? <img src={song.cover_url} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-white/5" />}
                                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                             {isCurrentSong && isPlaying ? <Pause className="w-6 h-6 text-white fill-white" /> : <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />}
                                         </div>
                                     </div>
                                     <div className="flex-1 overflow-hidden">
                                         <h3 className={`font-bold text-lg leading-none mb-1 truncate ${isCurrentSong ? 'text-[#1db954] font-black' : 'text-white'}`}>{song.title}</h3>
                                         <p className="text-sm font-medium text-white/40 truncate">{song.user?.name || 'Unknown'}</p>
                                     </div>
                                 </div>
                             )
                         })}
                     </div>

                     {/* Pagination Controls */}
                     {songs.links?.length > 3 && (
                         <div className="mt-12 flex justify-center items-center space-x-2 pb-24">
                             {songs.links.map((link, i) => {
                                 if (link.label === '...') return <span key={i} className="text-white/20">...</span>;
                                 
                                 const isLabelNumeric = !isNaN(link.label);
                                 const label = link.label.includes('Previous') ? '←' : link.label.includes('Next') ? '→' : link.label;

                                 return (
                                     <Link 
                                         key={i}
                                         href={link.url}
                                         dangerouslySetInnerHTML={{ __html: label }}
                                         className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                                             link.active 
                                             ? 'bg-[#1db954] text-black shadow-[0_0_20px_rgba(29,185,84,0.4)] hover:scale-110' 
                                             : 'glass-panel text-white/40 hover:text-white hover:bg-white/10'
                                         } ${!link.url ? 'opacity-20 pointer-events-none' : ''}`}
                                         preserveScroll
                                     />
                                 );
                             })}
                         </div>
                     )}
                </div>
            )}

            {/* YouTube Results Section (Visible only when searching) */}
            {searchQuery && youtubeResults.length > 0 && (
                <div className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <SearchIcon className="w-5 h-5 text-red-500" />
                            </div>
                            <h2 className="text-2xl font-black text-white tracking-tight uppercase">YouTube Results</h2>
                        </div>
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Keyless API</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {youtubeResults.map(video => {
                            const isCurrentSong = currentSong?.youtube_id === video.id;
                            return (
                                <div 
                                    key={video.id}
                                    className="glass-panel group p-4 rounded-[2rem] relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(239,68,68,0.1)] hover:-translate-y-2 border-white/5 hover:border-red-500/20"
                                >
                                    <div 
                                        className="relative aspect-video w-full rounded-[1.5rem] overflow-hidden mb-5 shadow-xl cursor-pointer"
                                        onClick={() => playSong({
                                            id: `yt-${video.id}`,
                                            title: video.title,
                                            youtube_id: video.id,
                                            cover_url: video.thumbnail,
                                            user: { name: video.author }
                                        })}
                                    >
                                        <img src={video.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-2xl">
                                                {isCurrentSong && isPlaying ? <Pause className="w-6 h-6 text-white fill-white" /> : <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />}
                                            </div>
                                        </div>
                                        <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded-md text-[10px] font-black text-white/80">
                                            {video.duration}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start px-1 mb-2">
                                        <div className="flex-1 overflow-hidden">
                                            <h3 className="font-bold text-sm leading-tight text-white line-clamp-2 mb-1 h-10">{video.title}</h3>
                                            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest truncate">{video.author}</p>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => addYouTubeSong(video)}
                                        disabled={loadingIds.includes(video.id)}
                                        className={`w-full ${loadingIds.includes(video.id) ? 'bg-white/10 opacity-50 cursor-not-allowed' : 'bg-white/5 hover:bg-[#1db954] hover:text-black'} py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2`}
                                    >
                                        <Plus className={`w-3 h-3 ${loadingIds.includes(video.id) ? 'animate-spin' : ''}`} />
                                        <span>{loadingIds.includes(video.id) ? 'Adding...' : 'Add to Aura'}</span>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Success Notification Toast */}
            {isAddedNotify && (
                <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-bottom-5 duration-500">
                    <div className="glass-panel px-8 py-4 rounded-full border border-[#1db954]/50 shadow-[0_0_30px_rgba(29,185,84,0.2)] flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-[#1db954] animate-pulse"></div>
                        <span className="text-sm font-bold text-white whitespace-nowrap">
                            "<span className="text-[#1db954]">{isAddedNotify}</span>" added to your Aura.
                        </span>
                    </div>
                </div>
            )}

            {filteredSongs.length === 0 && !searchQuery && (
                <div className="text-center py-20">
                    <Music className="w-16 h-16 text-white/10 mx-auto mb-4" />
                    <p className="text-white/30 font-medium text-lg">Δεν βρέθηκαν τραγούδια για την αναζήτησή σου.</p>
                </div>
            )}
        </div>
    );
}

Index.layout = page => <AuraLayout>{page}</AuraLayout>;
