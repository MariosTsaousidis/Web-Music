/** @type {import('tailwindcss').Config} */
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}