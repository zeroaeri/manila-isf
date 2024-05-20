import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
    ],
    server: {
        hmr: {
            host: "localhost",
            protocol: "ws",
        },
        watch: {
            usePolling: true,
        },
    },
    build: {
        rollupOptions: {
          external: ['axios'],
        },
    },
});
