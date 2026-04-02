import { Link, router } from '@inertiajs/react';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar({ playlists }) {
    const [isCreating, setIsCreating] = useState(false);

    const handleCreatePlaylist = () => {
        setIsCreating(true);
        const name = prompt("Όνομα νέας Playlist:", "My New Playlist");
        if (name) {
            router.post(route('playlists.createPlaylist'), { name }, {
                onFinish: () => setIsCreating(false),
                preserveScroll: true
            });
        } else {
            setIsCreating(false);
        }
    };

    return (
        <div className="w-64 bg-black flex flex-col h-full text-[#b3b3b3] p-6 space-y-6">
            <div className="flex items-center space-x-2 text-white pb-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-black rounded-full" />
                </div>
                <span className="text-xl font-bold">MusicWeb</span>
            </div>

            <div className="space-y-4">
                <Link href="/songs" className="flex items-center space-x-4 text-white hover:text-white transition group">
                    <Home className="w-6 h-6 text-white" />
                    <span className="font-semibold">Αρχική</span>
                </Link>
                <Link href="#" className="flex items-center space-x-4 hover:text-white transition group">
                    <Search className="w-6 h-6 group-hover:text-white" />
                    <span className="font-semibold">Αναζήτηση</span>
                </Link>
                <Link href="/playlists" className="flex items-center space-x-4 hover:text-white transition group">
                    <Library className="w-6 h-6 group-hover:text-white" />
                    <span className="font-semibold">Η Βιβλιοθήκη μου</span>
                </Link>
            </div>

            <div className="pt-2">
                <button 
                    onClick={handleCreatePlaylist}
                    disabled={isCreating}
                    className="flex items-center space-x-4 hover:text-white transition w-full mb-4 group disabled:opacity-50"
                >
                    <div className="bg-[#b3b3b3] group-hover:bg-white text-black p-1 rounded-sm transition">
                        <PlusSquare className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">Δημιουργία Playlist</span>
                </button>
                <button className="flex items-center space-x-4 hover:text-white transition w-full group">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-400 p-1 text-white rounded-sm group-hover:brightness-125 transition">
                        <Heart className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">Αγαπημένα Τραγούδια</span>
                </button>
            </div>

            <hr className="border-[#282828] my-2" />

            <div className="flex-1 overflow-y-auto spotify-scrollbar space-y-3">
                {playlists?.map((playlist) => (
                    <Link 
                        key={playlist.id} 
                        href={route('playlist.show', playlist.id)} 
                        className="block text-sm hover:text-white truncate transition"
                    >
                        {playlist.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
