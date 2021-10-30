import React from 'react'

// UI
import { Box } from '@chakra-ui/react'

// Components
import Navbar from '../components/public/Navbar'

const Public: React.FC = ({ children }) => {
    return (
        <Box h="100vh">
            <Navbar />

            <main>{children}</main>
        </Box>
    )
}

export default Public
