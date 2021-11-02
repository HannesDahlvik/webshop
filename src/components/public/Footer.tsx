import { NextPage } from 'next'

// Logic
import core from '../../logic/core'
import { usePulse } from '@pulsejs/react'

// UI
import { Flex, Heading, useColorMode } from '@chakra-ui/react'

const Footer: NextPage = () => {
    const wrapperSize = usePulse(core.state.wrapperSize)

    const { colorMode } = useColorMode()

    return (
        <Flex
            as="footer"
            w="100%"
            bottom={wrapperSize === '90%' ? '80px' : '0'}
            backgroundColor={colorMode === 'dark' ? 'gray.700' : 'white'}
            borderTopWidth="1px"
            borderTopColor="rgba(100, 100, 100, 0.25)"
        >
            <Flex w={wrapperSize} m="0 auto" pb="25em" pt="20">
                <Heading>Webshop</Heading>
            </Flex>
        </Flex>
    )
}

export default Footer
