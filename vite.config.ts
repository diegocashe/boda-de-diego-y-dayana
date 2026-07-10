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
                    weights: [400, 600, 700] as const, // 500 no se usa con font-serif en el código
                    styles: ['normal', 'italic'],
                    preload: [{ weight: 400, style: 'italic' }], // la variante del hero
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
