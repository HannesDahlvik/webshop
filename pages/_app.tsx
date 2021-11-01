import React from 'react'

// Config
import theme from '../src/config/theme'

// Layout
import Global from '../src/layouts/Global'

// UI
import { ChakraProvider, CSSReset } from '@chakra-ui/react'

// Styles
import '../src/assets/styles/index.scss'

const MyApp = ({ Component, pageProps }) => {
    return (
        <ChakraProvider theme={theme}>
            <Global>
                <Component {...pageProps} />
                <CSSReset />
            </Global>
        </ChakraProvider>
    )
}

export default MyApp
