import React from 'react'

// Logic
import core from '../logic/core'
import { usePulse } from '@pulsejs/react'

// UI
import { Box } from '@chakra-ui/react'

// Components
import Navbar from '../components/public/Navbar'
import BottomNavigation from '../components/public/BottomNavigation'
import Footer from '../components/public/Footer'

const Public: React.FC = ({ children }) => {
    const wrapperSize = usePulse(core.state.wrapperSize)

    return (
        <div>
            {wrapperSize !== '90%' && <Navbar />}

            <Box as="main" minH="calc(100vh - 80px)">
                {children}
            </Box>

            <Footer />
            {wrapperSize === '90%' && <BottomNavigation />}
        </div>
    )
}

export default Public
