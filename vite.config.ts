import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            types: path.resolve(__dirname, 'src/types'), // Assuming your types directory is in src
        },
    },
});
