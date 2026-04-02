import { Head, useForm, Link } from '@inertiajs/react';
import AuraLayout from '@/Layouts/AuraLayout';
import { Upload, Music, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Create({ genres, playlists }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        genre: genres?.[0] || '',
        published_at: new Date().toISOString().split('T')[0],
        file: null,
        cover_image: null,
    });

    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);
    
    const [fileName, setFileName] = useState('');
    const [coverPreview, setCoverPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('file', file);
            setFileName(file.name);
        }
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('cover_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post('/songs'); 
    };

    return (
        <div className="px-6 md:px-12 w-full max-w-5xl mx-auto">
            <Head title="Ανέβασμα" />
            
            <div className="mb-12">
                <h1 className="text-5xl md:text-7xl font-black text-white aura-text tracking-tighter mb-4">
                    Δημιούργησε. 
                </h1>
                <p className="text-white/40 text-lg font-medium">Μεταμόρφωσε την έμπνευσή σου σε ψηφιακή αύρα.</p>
            </div>

            <form onSubmit={submit} className="glass-panel rounded-[3rem] p-8 md:p-12 shadow-2xl space-y-12 relative overflow-hidden">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#1db954]/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Artwork Upload Area */}
                    <div className="w-full md:w-2/5">
                        <label className="block text-xs font-black uppercase tracking-[0.2em] mb-4 text-white/50 ml-2">Artwork</label>
                        <div 
                            onClick={() => coverInputRef.current?.click()}
                            className="aspect-square glass-panel rounded-[2.5rem] border-2 border-dashed border-white/10 hover:border-[#1db954]/50 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center overflow-hidden group relative shadow-inner"
                        >
                            {coverPreview ? (
                                <>
                                    <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                                            <ImageIcon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center group-hover:scale-110 transition-transform duration-500">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 mx-auto border border-white/10 group-hover:border-[#1db954]/30">
                                        <ImageIcon className="w-8 h-8 text-white/20 group-hover:text-[#1db954] transition-colors" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-white/30 group-hover:text-white transition">Select Image</span>
                                </div>
                            )}
                            <input 
                                ref={coverInputRef}
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleCoverChange} 
                            />
                        </div>
                        {errors.cover_image && <p className="text-[#f15e6c] text-xs font-bold mt-4 text-center">{errors.cover_image}</p>}
                    </div>


                    {/* Audio File Upload Area */}
                    <div className="flex-1 flex flex-col">
                        <label className="block text-xs font-black uppercase tracking-[0.2em] mb-4 text-white/50 ml-2">Audio Track</label>
                        <div 
                            className={`flex-1 border-2 border-dashed rounded-[2.5rem] p-10 flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden ${fileName ? 'border-[#1db954] bg-[#1db954]/5 shadow-[inset_0_0_40px_rgba(29,185,84,0.05)]' : 'glass-panel border-white/10 hover:border-white/30'}`}
                        >
                            {!fileName ? (
                                <div className="text-center flex flex-col items-center">
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 animate-pulse">
                                        <Music className="w-10 h-10 text-white/20" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Drop your sound</h3>
                                    <p className="text-sm font-medium text-white/30 mb-8 max-w-[200px]">Lossless WAV or high quality MP3 preferred.</p>
                                    <button 
                                        type="button" 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-white text-black font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl"
                                    >
                                        Choose File
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-[#1db954] rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(29,185,84,0.4)]">
                                        <Sparkles className="w-10 h-10 text-black animate-spin-slow" />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-2 max-w-[300px] truncate">{fileName}</h3>
                                    <button 
                                        type="button" 
                                        onClick={() => {
                                            setData('file', null);
                                            setFileName('');
                                            if(fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                        className="text-xs font-black uppercase tracking-widest text-[#f15e6c] hover:opacity-80 transition mt-4"
                                    >
                                        Remove Track
                                    </button>
                                </div>
                            )}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                onChange={handleFileChange}
                                accept=".mp3,.wav,.m4a,.ogg"
                            />
                        </div>
                        {errors.file && <p className="text-[#f15e6c] text-xs font-bold mt-4 ml-2">{errors.file}</p>}
                    </div>
                </div>

                {/* Meta Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                    <div className="col-span-1 md:col-span-2 space-y-3">
                        <label className="block text-xs font-black uppercase tracking-[0.2em] text-white/50 ml-2">Track Title</label>
                        <input 
                            type="text"
                            className="w-full bg-white/5 text-white border border-white/10 rounded-2xl px-6 py-4 hover:border-white/30 focus:border-[#1db954] focus:ring-4 focus:ring-[#1db954]/10 focus:outline-none transition-all placeholder-white/10 font-bold text-lg"
                            placeholder="Όνομα κομματιού..."
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                        />
                        {errors.title && <p className="text-[#f15e6c] text-xs font-bold mt-2 ml-2">{errors.title}</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="block text-xs font-black uppercase tracking-[0.2em] text-white/50 ml-2">Genre</label>
                        <select 
                            className="w-full bg-white/5 text-white border border-white/10 rounded-2xl px-6 py-4 hover:border-white/30 focus:border-[#1db954] focus:ring-4 focus:ring-[#1db954]/10 focus:outline-none transition-all appearance-none cursor-pointer font-bold"
                            value={data.genre}
                            onChange={e => setData('genre', e.target.value)}
                        >
                            <option value="" disabled className="bg-zinc-900">Είδος...</option>
                            {genres?.map(g => <option key={g} value={g} className="bg-zinc-900">{g}</option>)}
                        </select>
                        {errors.genre && <p className="text-[#f15e6c] text-xs font-bold mt-2 ml-2">{errors.genre}</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="block text-xs font-black uppercase tracking-[0.2em] text-white/50 ml-2">Release Date</label>
                        <input 
                            type="date"
                            className="w-full bg-white/5 text-white border border-white/10 rounded-2xl px-6 py-4 hover:border-white/30 focus:border-[#1db954] focus:ring-4 focus:ring-[#1db954]/10 focus:outline-none transition-all font-bold"
                            value={data.published_at}
                            onChange={e => setData('published_at', e.target.value)}
                        />
                        {errors.published_at && <p className="text-[#f15e6c] text-xs font-bold mt-2 ml-2">{errors.published_at}</p>}
                    </div>

                    <div className="col-span-1 md:col-span-2 space-y-3">
                        <label className="block text-xs font-black uppercase tracking-[0.2em] text-white/50 ml-2">Description / Lyrics</label>
                        <textarea 
                            className="w-full bg-white/5 text-white border border-white/10 rounded-3xl px-6 py-4 hover:border-white/30 focus:border-[#1db954] focus:ring-4 focus:ring-[#1db954]/10 focus:outline-none transition-all placeholder-white/10 min-h-[140px] font-medium leading-relaxed"
                            placeholder="Πρόσθεσε στίχους ή πληροφορίες για την παραγωγή..."
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-[#f15e6c] text-xs font-bold mt-2 ml-2">{errors.description}</p>}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                    <Link href="/songs" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-rose-400 transition ml-4">
                        Cancel
                    </Link>
                    <button 
                        type="submit"
                        disabled={processing}
                        className={`bg-[#1db954] text-black font-black uppercase tracking-[0.2em] text-sm px-12 py-5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(29,185,84,0.2)] ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {processing ? 'Uploading...' : 'Publish Aura'}
                    </button>
                </div>
            </form>
        </div>
    );
}

Create.layout = page => <AuraLayout>{page}</AuraLayout>;
