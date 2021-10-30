import React from 'react'

// Routing
import Link from 'next/link'

// Layout
import Public from '../src/frontend/layouts/Public'

// UI
import { Box, Button, Code, Divider, Flex, Heading } from '@chakra-ui/react'

const Custom404: React.FC = () => {
    return (
        <Public>
            <Flex
                textAlign="center"
                justify="center"
                align="center"
                direction="column"
                w="100%"
                py="150px"
            >
                <Box>
                    <Heading fontSize="6xl" mb="10px">
                        404
                    </Heading>
                    <Heading>
                        No match for{' '}
                        <Code fontSize="100%">{location.pathname}</Code>
                    </Heading>
                    <Divider my={5} />
                    <Link href="/" passHref>
                        <Button size="lg" as="button" colorScheme="primary">
                            HOME
                        </Button>
                    </Link>
                </Box>
            </Flex>
        </Public>
    )
}

export default Custom404
