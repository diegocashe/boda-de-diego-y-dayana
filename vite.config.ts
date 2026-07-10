import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600] as const,
                    // Precargar solo el peso base — el browser descarga el resto
                    // vía unicode-range cuando los necesita
                    preload: [{ weight: 400, style: 'normal' }],
                }),
                bunny('Cormorant Garamond', {
                    weights: [400, 500, 600, 700] as const,
                    styles: ['normal', 'italic'],
                    // El hero usa font-semibold (600 normal) para los nombres,
                    // que es el texto más grande above-the-fold
                    preload: [{ weight: 600, style: 'normal' }],
                }),
                bunny('Mulish', {
                    weights: [400, 500, 600, 700] as const, // 300 (font-light) no se usa
                    preload: false, // no es crítica above-the-fold
                }),
            ],
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
});
