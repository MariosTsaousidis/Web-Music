import { Head, Link } from '@inertiajs/react';
import AuraLayout from '@/Layouts/AuraLayout';
import { Music, ListMusic, Calendar, Mail, User as UserIcon, ShieldCheck } from 'lucide-react';

export default function Show({ user, stats }) {
    return (
        <div className="px-6 md:px-12 w-full max-w-5xl mx-auto pb-24">
            <Head title="Το Προφίλ μου" />
            
            <div className="mb-12">
                <h1 className="text-5xl md:text-7xl font-black text-white aura-text tracking-tighter mb-4">
                    Identity.
                </h1>
                <p className="text-white/40 text-lg font-medium">Η δική σου μοναδική ψηφιακή υπογραφή.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-panel rounded-[3rem] p-10 md:p-14 relative overflow-hidden group shadow-2xl">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#1db954]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#1db954]/20 transition-all duration-1000"></div>
                        
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12 relative z-10">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#1db954] to-emerald-800 p-1.5 shadow-[0_0_50px_rgba(29,185,84,0.3)]">
                                <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden border-4 border-white/5">
                                    <span className="text-6xl md:text-8xl font-black aura-text uppercase">{user.name[0]}</span>
                                </div>
                            </div>
                            
                            <div className="flex-1 text-center md:text-left pt-4">
                                <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">{user.name}</h2>
                                    <ShieldCheck className="w-6 h-6 text-[#1db954]" title="Verified Artist" />
                                </div>
                                <div className="flex items-center justify-center md:justify-start space-x-2 text-white/40 font-medium mb-6">
                                    <Mail className="w-4 h-4" />
                                    <span>{user.email}</span>
                                </div>
                                
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex items-center space-x-3 backdrop-blur-md">
                                        <Calendar className="w-4 h-4 text-[#1db954]" />
                                        <span className="text-xs font-black uppercase tracking-widest text-white/60">Joined {new Date(user.created_at).getFullYear()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="glass-panel rounded-[2.5rem] p-8 border-white/5 hover:border-[#1db954]/30 transition group shadow-xl">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 bg-[#1db954]/10 rounded-2xl group-hover:bg-[#1db954]/20 transition">
                                    <Music className="w-6 h-6 text-[#1db954]" />
                                </div>
                                <h3 className="font-black uppercase tracking-widest text-xs text-white/40">Τραγούδια</h3>
                            </div>
                            <p className="text-5xl font-black text-white tracking-tighter">{stats.songs_count}</p>
                            <p className="text-sm text-white/20 font-medium mt-2">Συνολικά ανεβάσματα</p>
                        </div>

                        <div className="glass-panel rounded-[2.5rem] p-8 border-white/5 hover:border-[#1db954]/30 transition group shadow-xl">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20 transition">
                                    <ListMusic className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="font-black uppercase tracking-widest text-xs text-white/40">Συλλογές</h3>
                            </div>
                            <p className="text-5xl font-black text-white tracking-tighter">{stats.playlists_count}</p>
                            <p className="text-sm text-white/20 font-medium mt-2">Δημιουργημένες λίστες</p>
                        </div>
                    </div>
                </div>

                {/* Account Actions / Settings Side */}
                <div className="space-y-6">
                    <div className="glass-panel rounded-[2.5rem] p-8 shadow-xl">
                        <h3 className="text-lg font-black text-white mb-6 tracking-tight flex items-center">
                            <UserIcon className="w-5 h-5 mr-3 text-[#1db954]" /> Διαχείριση Λογαριασμού
                        </h3>
                        <div className="space-y-3">
                            <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-2xl font-bold text-sm transition-all text-left">
                                Επεξεργασία Προφίλ
                            </button>
                            <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-2xl font-bold text-sm transition-all text-left">
                                Αλλαγή Κωδικού
                            </button>
                            <div className="pt-4 mt-4 border-t border-white/5">
                                <Link 
                                    href={route('logout')} 
                                    method="post" 
                                    as="button" 
                                    className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all text-center"
                                >
                                    Αποσύνδεση
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel rounded-[2.5rem] p-8 shadow-xl opacity-50">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-center">Aura Member since {new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

Show.layout = page => <AuraLayout>{page}</AuraLayout>;
