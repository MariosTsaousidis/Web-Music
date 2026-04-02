import Sidebar from '@/Components/Sidebar';
import Player from '@/Components/Player';
import Topbar from '@/Components/Topbar';

export default function SpotifyLayout({ children, playlists }) {
    return (
        <div className="h-screen bg-black flex flex-col text-white overflow-hidden font-sans">
            <div className="flex-1 flex overflow-hidden">
                <Sidebar playlists={playlists} />
                <div className="flex-1 bg-[#121212] flex flex-col relative overflow-hidden rounded-md my-2 mr-2">
                    <Topbar />
                    <div className="flex-1 overflow-y-auto spotify-scrollbar">
                        {children}
                    </div>
                </div>
            </div>
            <Player />
        </div>
    );
}
