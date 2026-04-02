import { Link } from '@inertiajs/react';

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen relative font-sans selection:bg-[#1db954] selection:text-black antialiased overflow-hidden flex flex-col justify-center items-center">
            {/* The Animated Mesh Background Elements from Aura */}
            <div className="aura-bg"></div>
            <div className="aura-blob blob-1"></div>
            <div className="aura-blob blob-2"></div>
            
            <Link href="/" className="absolute top-12 left-1/2 -translate-x-1/2 group flex flex-col items-center z-20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1db954] to-purple-500 mb-2 animate-pulse shadow-[0_0_20px_rgba(29,185,84,0.5)] flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full group-hover:scale-125 transition" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white drop-shadow-xl">
                    Aura<span className="text-white/30 font-light text-lg">Play</span>
                </span>
            </Link>

            <main className="relative z-10 w-full max-w-lg px-6">
                <div className="glass-panel rounded-[2.5rem] p-10 sm:p-14 shadow-2xl relative overflow-hidden">
                    {/* Subtle Glow inside the card */}
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                    {children}
                </div>
            </main>
            
            <footer className="absolute bottom-8 text-white/20 text-xs font-bold tracking-widest uppercase pointer-events-none">
                Aura Music Experience &bull; 2026
            </footer>
        </div>
    );
}
