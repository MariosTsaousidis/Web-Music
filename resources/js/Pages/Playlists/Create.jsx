import { Head, useForm, Link } from '@inertiajs/react';
import AuraLayout from '@/Layouts/AuraLayout';
import { Plus, Sparkles, FolderPlus } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/playlists');
    };

    return (
        <div className="px-6 md:px-12 w-full max-w-2xl mx-auto">
            <Head title="Νέα Συλλογή" />
            
            <div className="mb-12">
                <h1 className="text-5xl md:text-7xl font-black text-white aura-text tracking-tighter mb-4">
                    Mix.
                </h1>
                <p className="text-white/40 text-lg font-medium">Δώσε όνομα στη νέα σου ακουστική συλλογή.</p>
            </div>

            <form onSubmit={submit} className="glass-panel rounded-[3rem] p-10 md:p-14 shadow-2xl space-y-10 relative overflow-hidden">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-inner">
                        <FolderPlus className="w-10 h-10 text-[#1db954]" />
                    </div>
                    
                    <div className="w-full space-y-3">
                        <label className="block text-xs font-black uppercase tracking-[0.2em] text-white/50 text-center mb-4">Playlist Name</label>
                        <input 
                            type="text"
                            autoFocus
                            className="w-full bg-transparent text-white border-b-2 border-white/10 focus:border-[#1db954] px-4 py-6 focus:outline-none transition-all placeholder-white/10 font-black text-3xl md:text-5xl text-center tracking-tighter shadow-none"
                            placeholder="My Vibe..."
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-[#f15e6c] text-xs font-bold mt-4 text-center">{errors.name}</p>}
                    </div>
                </div>

                <div className="flex flex-col space-y-4 items-center pt-8">
                    <button 
                        type="submit"
                        disabled={processing || !data.name}
                        className={`w-full max-w-sm bg-white text-black font-black uppercase tracking-[0.2em] text-sm px-10 py-5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center justify-center space-x-3 ${processing || !data.name ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                    >
                        <Sparkles className="w-5 h-5 fill-current" />
                        <span>{processing ? 'Creating...' : 'Create Collection'}</span>
                    </button>
                    
                    <Link href="/playlists" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition">
                        Back to Library
                    </Link>
                </div>
            </form>
        </div>
    );
}

Create.layout = page => <AuraLayout>{page}</AuraLayout>;
