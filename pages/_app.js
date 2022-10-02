import '../styles/globals.css'
import React from 'react'
import Header from '../components/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import FootComponent from '../components/Footer'
import { Box } from '@mui/material'
function MyApp({ Component, pageProps }) {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    })
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <React.Fragment>
                <Header />
                <Box sx={{ minHeight: '100vh' }}>
                    <Component {...pageProps} />
                </Box>
                <FootComponent />
            </React.Fragment>
        </ThemeProvider>
    )
}

export default MyApp
