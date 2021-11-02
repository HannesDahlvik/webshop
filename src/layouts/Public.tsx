import React from 'react'

// Logic
import core from '../logic/core'
import { usePulse } from '@pulsejs/react'

// UI
import { Flex, Box } from '@chakra-ui/react'

// Components
import Navbar from '../components/public/Navbar'
import BottomNavigation from '../components/public/BottomNavigation'
import Footer from '../components/public/Footer'

const Public: React.FC = ({ children }) => {
    const wrapperSize = usePulse(core.state.wrapperSize)

    return (
        <Flex flexDir="column" minH="100vh">
            {wrapperSize !== '90%' && <Navbar />}

            <Box as="main" flex="1 0 auto" h="100%">
                {children}

                <Footer />
            </Box>

            {wrapperSize === '90%' && <BottomNavigation />}
        </Flex>
    )
}

export default Public
