import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: {
                app: 'resources/js/app.jsx',
                stockPrice: 'resources/js/Pages/StockPrice.jsx',
            },
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: true,
        port: 8080,
        /*
        Uncomment this section if on windows and hot reload is not working correctly.

        watch: {
            usePolling: true
        }
        */
    }
});
