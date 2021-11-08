import React from 'react'

// Logic
import core from '../../logic/core'
import { usePulse } from '@pulsejs/react'

// Routing
import Link from 'next/link'

// UI
import { Box, Text, Flex, Avatar, Icon } from '@chakra-ui/react'
import { ArrowFatLeft, House, List, Plus } from 'phosphor-react'

const links = [
    {
        title: 'Dashboard',
        path: 'dashboard',
        icon: House
    },
    {
        title: 'Create',
        path: 'create',
        icon: Plus
    },
    {
        title: 'Products',
        path: 'products',
        icon: List
    }
]

const AdminSidebar: React.FC = () => {
    const user = usePulse(core.state.user)
    const wrapperSize = usePulse(core.state.wrapperSize)

    return (
        <Box
            pos="sticky"
            top="0"
            left="0"
            background="gray.700"
            h="100vh"
            color="white"
            w={
                wrapperSize === '4xl'
                    ? '300px'
                    : wrapperSize === '2xl'
                    ? '250px'
                    : wrapperSize === '90%'
                    ? '200px'
                    : '450px'
            }
        >
            <Flex justify="center" w="100%">
                <Avatar name={user?.firstname} size="2xl" my="12" />
            </Flex>

            <Flex direction="column" px="8">
                {links.map((row, i: number) => (
                    <Link href={`/admin/${row.path}`} passHref key={i}>
                        <Flex
                            align="center"
                            p="4"
                            px="8"
                            mb="6"
                            transition=".3s"
                            borderRadius="lg"
                            cursor="pointer"
                            backgroundColor={
                                `/admin/${row.path}` === location.pathname
                                    ? 'blue.500'
                                    : ''
                            }
                            _hover={{
                                backgroundColor: location.pathname.includes(
                                    row.path
                                )
                                    ? ''
                                    : 'blue.50'
                            }}
                        >
                            <Icon fontSize="2xl" as={row.icon} weight="fill" />
                            <Text ml="2">{row.title}</Text>
                        </Flex>
                    </Link>
                ))}
            </Flex>

            <Link href="/" passHref>
                <Flex
                    direction="column"
                    px="8"
                    pos="absolute"
                    bottom="8"
                    w="100%"
                    cursor="pointer"
                >
                    <Flex align="center" p="4" px="8" borderRadius="lg">
                        <Icon fontSize="2xl" as={ArrowFatLeft} weight="fill" />
                        <Text ml="2">Back</Text>
                    </Flex>
                </Flex>
            </Link>
        </Box>
    )
}

export default AdminSidebar
