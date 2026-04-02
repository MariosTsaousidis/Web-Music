import { Head, Link } from '@inertiajs/react';
import AuraLayout from '@/Layouts/AuraLayout';
import { Flame, Database, Plus } from 'lucide-react';

export default function Index({ playlists }) {
    return (
        <div className="px-6 md:px-12 w-full max-w-7xl mx-auto">
            <Head title="Συλλογές" />
            
            <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter aura-text mb-2">Συλλογές</h1>
                    <p className="text-white/50 text-lg font-medium">Η προσωπική σου ακουστική βιβλιοθήκη.</p>
                </div>
                
                <Link href="/playlists/create" className="hidden border border-white/20 glass-panel md:flex items-center space-x-2 px-6 py-3 rounded-full hover:bg-white/10 transition hover:scale-105 active:scale-95">
                    <Plus className="w-5 h-5 text-[#1db954]" />
                    <span className="font-bold">Νέα Συλλογή</span>
                </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {playlists?.length > 0 ? (
                    playlists.map((playlist, idx) => {
                        // Alternate gradients for boxes dynamically
                        const grids = [
                            'from-purple-500/20 to-indigo-500/20',
                            'from-[#1db954]/20 to-[#121212]/20',
                            'from-pink-500/20 to-rose-500/20',
                            'from-blue-500/20 to-cyan-500/20',
                        ];
                        const gr = grids[idx % 4];

                        return (
                            <Link 
                                href={`/playlists/${playlist.id}`} 
                                key={playlist.id} 
                                className={`glass-panel p-6 md:p-8 rounded-[2rem] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] transition duration-500 bg-gradient-to-br ${gr} flex flex-col justify-between aspect-square relative overflow-hidden group`}
                            >
                                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition duration-700"></div>
                                
                                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
                                    <Database className="w-6 h-6 text-white" />
                                </div>
                                
                                <div>
                                    <h3 className="font-black text-2xl text-white mb-1 truncate tracking-tight">{playlist.name}</h3>
                                    <p className="text-sm text-white/50 font-medium tracking-wide border-t border-white/10 pt-2 mt-4 inline-block">PLAYLIST</p>
                                </div>
                            </Link>
                        )
                    })
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center">
                        <Flame className="w-20 h-20 text-white/20 mb-6" />
                        <h2 className="text-3xl font-black text-white/80 mb-2 tracking-tighter">Δεν βρέθηκαν συλλογές</h2>
                        <p className="text-white/40 mb-8">Δημιούργησε την πρώτη σου συλλογή τώρα.</p>
                        <Link href="/playlists/create" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition">
                            Δημιουργία
                        </Link>
                    </div>
                )}
            </div>
            
            {/* Mobile Create Button */}
            <Link href="/playlists/create" className="md:hidden glass-panel border border-white/10 fixed bottom-32 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50">
                <Plus className="w-8 h-8 text-[#1db954]" />
            </Link>
        </div>
    );
}

Index.layout = page => <AuraLayout>{page}</AuraLayout>;
