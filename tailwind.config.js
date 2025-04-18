module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de incluir tus archivos de componentes
    ],
    theme: {
        extend: {
            fontFamily: {
                 // Add the Righteous font
            },
            animation: {
                'scale-in-center': 'scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
            },
            keyframes: {
                'scale-in-center': {
                    '0%': {
                        transform: 'scale(0)',
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'scale(1)',
                        opacity: '1',
                    },
                },
            },
        },
    },
    plugins: [],
};