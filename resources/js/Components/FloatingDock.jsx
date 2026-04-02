import { Link, usePage } from '@inertiajs/react';
import { Home, Search, Library, Plus } from 'lucide-react';

export default function FloatingDock() {
    const { url } = usePage();

    const tabs = [
        { name: 'Home', icon: Home, route: '/' },
        { name: 'Search', icon: Search, route: '#' },
        { name: 'Library', icon: Library, route: '/playlists' },
        { name: 'Upload', icon: Plus, route: '/songs/create' }
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="glass-panel rounded-full px-6 py-4 flex items-center space-x-8">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = url === tab.route;
                    
                    return (
                        <Link 
                            key={tab.name}
                            href={tab.route}
                            className={`flex flex-col items-center justify-center group relative transition-transform hover:scale-110 ${isActive ? 'text-white' : 'text-white/50'}`}
                        >
                            <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-white' : 'group-hover:text-white/80'}`} />
                            {isActive && (
                                <span className="absolute -bottom-3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]"></span>
                            )}
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
