import React from 'react'

// UI
import { Flex, Box, Heading } from '@chakra-ui/react'

const Signup: React.FC = () => {
    return (
        <Flex w="100%">
            <Box maxW="375px" w="100%">
                <Heading fontSize="5xl" mb="8">
                    Signup
                </Heading>
            </Box>
        </Flex>
    )
}

export default Signup
