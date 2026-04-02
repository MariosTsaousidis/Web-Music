import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { PlayerProvider } from '@/Context/PlayerContext';

const appName = import.meta.env.VITE_APP_NAME || 'Music Web';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <PlayerProvider>
                <App {...props} />
            </PlayerProvider>
        );
    },
    progress: {
        color: '#1db954', // Spotify green
    },
});
