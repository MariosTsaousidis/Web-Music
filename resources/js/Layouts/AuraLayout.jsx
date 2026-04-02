import FloatingDock from '@/Components/FloatingDock';
import FloatingPlayer from '@/Components/FloatingPlayer';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { usePage, Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { usePlayer } from '@/Context/PlayerContext';

export default function AuraLayout({ children }) {
    const { auth } = usePage().props;
    const { currentSong, isPlaying, togglePlay, progress, duration, seek, volume, setVolume, playNext, playPrev, isShuffle, setIsShuffle, isRepeat, setIsRepeat } = usePlayer();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Audio Awakening Logic - Unlocks audio context on first screen interaction
    const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
    useEffect(() => {
        const unlockAudio = () => {
            if (isAudioUnlocked) return;
            const context = new (window.AudioContext || window.webkitAudioContext)();
            if (context.state === 'suspended') {
                context.resume();
            }
            setIsAudioUnlocked(true);
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
        };
        document.addEventListener('click', unlockAudio);
        document.addEventListener('keydown', unlockAudio);
        return () => {
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
        };
    }, [isAudioUnlocked]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen font-sans selection:bg-[#1db954] selection:text-black antialiased relative">
            {/* User Menu Top Right */}
            {auth.user && (
                <div className="fixed top-8 right-8 z-[100]" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="glass-panel p-2 pl-4 pr-3 rounded-full flex items-center space-x-3 hover:scale-105 active:scale-95 transition-all shadow-xl group border-white/5 hover:border-white/20"
                    >
                        <span className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition">
                            {auth.user.name.split(' ')[0]}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1db954] to-emerald-700 flex items-center justify-center text-black font-black text-xs shadow-[0_0_20px_rgba(29,185,84,0.3)]">
                            {auth.user.name[0].toUpperCase()}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-white/20 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute top-full mt-4 right-0 w-64 glass-panel rounded-[2rem] border border-white/10 p-3 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 py-4 mb-2 border-b border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">Signed in as</p>
                                <p className="text-sm font-bold truncate">{auth.user.email}</p>
                            </div>

                            <Link
                                href={route('profile.show')}
                                className="w-full flex items-center space-x-3 px-4 py-4 rounded-2xl hover:bg-white/5 transition group"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="p-2 rounded-xl bg-white/5 group-hover:bg-[#1db954]/20 transition">
                                    <User className="w-4 h-4 text-white/40 group-hover:text-[#1db954]" />
                                </div>
                                <span className="text-sm font-bold">Το Προφίλ μου</span>
                            </Link>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full flex items-center space-x-3 px-4 py-4 rounded-2xl hover:bg-rose-500/10 transition group text-left"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="p-2 rounded-xl bg-white/5 group-hover:bg-rose-500/20 transition">
                                    <LogOut className="w-4 h-4 text-white/40 group-hover:text-rose-500" />
                                </div>
                                <span className="text-sm font-bold">Αποσύνδεση</span>
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {/* The Animated Mesh Background Elements */}
            <div className="aura-bg"></div>
            <div className="aura-blob blob-1"></div>
            <div className="aura-blob blob-2"></div>

            {/* App Header (Optional, purely aesthetic Topbar element) */}
            <header className="absolute top-0 w-full p-8 flex justify-between items-center z-20 pointer-events-none">
                <div className="text-2xl font-black tracking-tighter text-white drop-shadow-xl flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1db954] to-purple-500 mr-2 animate-pulse shadow-[0_0_20px_rgba(29,185,84,0.5)]"></div>
                    Aura<span className="text-white/30 font-light">Play</span>
                </div>
            </header>

            {/* The Main Content */}
            <main className="relative z-10 pt-24 pb-40 min-h-screen">
                {children}
            </main>

            {/* Global Floating Components */}
            <FloatingPlayer />
            <FloatingDock />
        </div>
    );
}
