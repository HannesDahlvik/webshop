import React from 'react'

// UI
import { Spinner, Flex } from '@chakra-ui/react'

const Loader: React.FC = () => {
    return (
        <Flex width="100%" height="200px" justify="center" align="center">
            <Spinner size="xl" />
        </Flex>
    )
}

export default Loader
