import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        react()
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
    esbuild: {
        jsxInject: `import React from 'react'`,
    },
});
