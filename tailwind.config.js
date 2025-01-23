/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];

export const theme = {

  extend: {

    colors: {
      main: "#EE4135",
      secondary: "#9497a1",
    },
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        'sm': '480px',
        'md': '640px',
        'lg': '800px',
        'xl': '1024px',
        '2xl': '1200px',
      },
    },
    // إضافة Keyframes للرسوم المتحركة
    keyframes: {
      fadeInUp: {
        '0%': {
          opacity: '0',
          transform: 'translateY(20px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
      fadeInDown: {
        '0%': {
          opacity: '0',
          transform: 'translateY(-20px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
      fadeInLeft: {
        '0%': {
          opacity: '0',
          transform: 'translateX(-20px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      fadeInRight: {
        '0%': {
          opacity: '0',
          transform: 'translateX(20px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      scaleIn: {
        '0%': {
          opacity: '0',
          transform: 'scale(0.9)',
        },
        '100%': {
          opacity: '1',
          transform: 'scale(1)',
        },
      },
    },
    // إضافة Animations
    animation: {
      'fade-in-up': 'fadeInUp 0.5s ease-out',
      'fade-in-down': 'fadeInDown 0.5s ease-out',
      'fade-in-left': 'fadeInLeft 0.5s ease-out',
      'fade-in-right': 'fadeInRight 0.5s ease-out',
      'scale-in': 'scaleIn 0.3s ease-out',
    },
  },
};
export const darkMode = 'class'; // هذه هي السطر المطلوب
export const plugins = [];