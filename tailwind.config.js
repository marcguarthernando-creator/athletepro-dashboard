/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./screens/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#00E5FF',
                'primary-hover': '#00B8CC',
                secondary: '#2979FF',
                background: {
                    dark: '#0A0F1C', // Dark blue/black background
                    light: '#F8FAFC'
                },
                surface: {
                    dark: '#161C2C',
                    border: '#2D3748'
                },
                text: {
                    primary: '#FFFFFF',
                    secondary: '#94A3B8'
                }
            },
            fontFamily: {
                display: ['Outfit', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
