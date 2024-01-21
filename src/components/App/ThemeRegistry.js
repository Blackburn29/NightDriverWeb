'use client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });

const theme = createTheme({
    typography: {
        ...montserrat.style,
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#03cb03',
        },
        secondary: {
            main: '#03a499',
        },
    }
});


const ThemeRegistry = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeRegistry;
