import React from 'react'

// Config
import theme from '../src/frontend/config/theme'

// Layout
import Global from '../src/frontend/layouts/Global'

// UI
import { ChakraProvider } from '@chakra-ui/react'

// Styles
import '../src/frontend/assets/styles/index.scss'

const MyApp = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={theme}>
            <Global>
                <Component {...pageProps} />
            </Global>
        </ChakraProvider>
    )
}

export default MyApp
