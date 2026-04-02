<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <title>Document</title>
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        <!-- PWA Configuration -->
        <link rel="manifest" href="/manifest.json">
        <meta name="theme-color" content="#1db954">
        
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js').then(reg => {
                        console.log('SW registered');
                    }).catch(err => console.log('SW registration error:', err));
                });
            }
        </script>

        <!-- Scripts -->
        @inertiaHead
        @routes
    </head>
    <body>
        @inertia
    </body>
</html>
