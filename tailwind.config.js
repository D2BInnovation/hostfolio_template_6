/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0f',
                primary: {
                    DEFAULT: '#7c3aed', // Violet 600
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#db2777', // Pink 600
                    foreground: '#ffffff',
                },
                accent: {
                    DEFAULT: '#22d3ee', // Cyan 400
                    foreground: '#0f172a',
                },
                muted: {
                    DEFAULT: '#1e293b', // Slate 800
                    foreground: '#94a3b8', // Slate 400
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #7c3aed 0deg, #db2777 180deg, #22d3ee 360deg)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    from: { backgroundPosition: '0 0' },
                    to: { backgroundPosition: '-200% 0' },
                }
            }
        },
    },
    plugins: [],
}
