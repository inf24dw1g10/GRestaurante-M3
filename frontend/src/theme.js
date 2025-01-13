// src/theme.js
import { defaultTheme } from 'react-admin';

export const theme = {
    ...defaultTheme,
    palette: {
        primary: {
            main: '#2C3E50',  // Azul escuro profissional
            light: '#34495E',
            dark: '#1A252F',
            contrastText: '#fff',
        },
        secondary: {
            main: '#E74C3C',  // Vermelho para ações importantes
            light: '#FF6B6B',
            dark: '#C0392B',
            contrastText: '#fff',
        },
        background: {
            default: '#F5F5F5',
            paper: '#FFFFFF',
        },
        error: {
            main: '#E74C3C',
        },
        success: {
            main: '#27AE60',
        },
        warning: {
            main: '#F39C12',
        },
        text: {
            primary: '#2C3E50',
            secondary: '#7F8C8D',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h4: {
            fontWeight: 500,
            fontSize: '1.25rem',
        },
        h5: {
            fontWeight: 500,
            fontSize: '1.1rem',
        },
        h6: {
            fontWeight: 500,
            fontSize: '1rem',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        RaMenuItemLink: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    margin: '2px 8px',
                    padding: '8px 12px',
                    '&.RaMenuItemLink-active': {
                        backgroundColor: '#2C3E50',
                        color: '#fff',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
        },
    },
};