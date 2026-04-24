/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // SecureVault Brand Colors (Updated Palette)
        'vault': {
          'bg': '#0B0F17',        // Background
          'surface': '#111827',   // Surface
          'surface-2': '#1F2937', // Surface-2
          'border': '#2D3748',    // Border
          'primary': '#3B82F6',   // Primary (Blue)
          'text': '#E5E7EB',      // Text Primary
          'text-secondary': '#9CA3AF', // Text Secondary
        },
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      fontSize: {
        'h1': ['28px', { fontWeight: '700', lineHeight: '1.2' }],
        'h2': ['24px', { fontWeight: '700', lineHeight: '1.2' }],
        'body-lg': ['16px', { fontWeight: '500', lineHeight: '1.5' }],
        'body': ['14px', { fontWeight: '400', lineHeight: '1.5' }],
        'body-sm': ['12px', { fontWeight: '400', lineHeight: '1.4' }],
        'mono': ['12px', { fontFamily: 'monospace', fontWeight: '400' }],
      },
      boxShadow: {
        'glow': '0 0 12px rgba(59, 130, 246, 0.4)',
        'glow-sm': '0 0 8px rgba(59, 130, 246, 0.2)',
      },
      animation: {
        'folder-spin': 'spin 0.2s ease-out',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(90deg)' },
        },
      },
    },
  },
  plugins: [],
};
