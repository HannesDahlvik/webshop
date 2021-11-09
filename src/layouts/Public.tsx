import React from 'react'

// Logic
import core from '../logic/core'
import { usePulse } from '@pulsejs/react'

// UI
import { Box, Flex, Icon, useColorMode } from '@chakra-ui/react'
import { Sun, Moon } from 'phosphor-react'

// Components
import Navbar from '../components/public/Navbar'
import BottomNavigation from '../components/public/BottomNavigation'
import Footer from '../components/public/Footer'

const Public: React.FC = ({ children }) => {
    const wrapperSize = usePulse(core.state.wrapperSize)

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <>
            <div>
                {wrapperSize !== '90%' && <Navbar />}

                <Box as="main" minH="calc(100vh - 80px)">
                    {children}
                </Box>

                <Footer />
                {wrapperSize === '90%' && <BottomNavigation />}
            </div>

            {wrapperSize === '90%' && (
                <Flex
                    justify="center"
                    align="center"
                    pos="fixed"
                    right="12px"
                    bottom="92px"
                    w="50px"
                    h="50px"
                    color="black"
                    backgroundColor="blue.200"
                    borderRadius="full"
                    p="3"
                >
                    <Icon
                        as={colorMode === 'dark' ? Sun : Moon}
                        weight="fill"
                        fontSize="2xl"
                        cursor="pointer"
                        onClick={toggleColorMode}
                    />
                </Flex>
            )}
        </>
    )
}

export default Public
