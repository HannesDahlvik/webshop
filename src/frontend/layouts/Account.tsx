import React from 'react'

// Logic
import core from '../../../src/frontend/logic/core'
import { usePulse } from '@pulsejs/react'

// Routing
import { useRouter } from 'next/router'

// Layout
import Public from './Public'

// UI
import {
    Grid,
    Flex,
    Text,
    Heading,
    Box,
    Icon,
    useColorMode
} from '@chakra-ui/react'
import { Gear, NavigationArrow, ShoppingBag, UserCircle } from 'phosphor-react'

const links = [
    {
        title: 'My details',
        path: 'details',
        icon: UserCircle
    },
    {
        title: 'My orders',
        path: 'orders',
        icon: ShoppingBag
    },
    {
        title: 'My address book',
        path: 'address-book',
        icon: NavigationArrow
    },
    {
        title: 'Account settings',
        path: 'settings',
        icon: Gear
    }
]

const Account: React.FC = ({ children }) => {
    const user = usePulse(core.state.user)
    const wrapperSize = usePulse(core.state.wrapperSize)

    const { colorMode } = useColorMode()

    const router = useRouter()

    return (
        <Public>
            <Flex w={wrapperSize} m="0 auto" direction="column" py="25px">
                <Heading fontSize="4xl">Hello, {user?.firstname}!</Heading>

                <Grid templateColumns="1fr 3.5fr" pt="25px">
                    <Flex direction="column" py="4">
                        {links.map((row, i: number) => {
                            return (
                                <Flex
                                    key={i}
                                    py="2"
                                    px="4"
                                    mb="1"
                                    transition=".25s"
                                    align="center"
                                    borderRadius="md"
                                    cursor="pointer"
                                    _hover={{
                                        backgroundColor:
                                            location.pathname ===
                                            `/account/${row.path}`
                                                ? 'rgba(49, 130, 206, 0.25)'
                                                : 'rgba(49, 130, 206, 0.1)'
                                    }}
                                    backgroundColor={
                                        location.pathname ===
                                        `/account/${row.path}`
                                            ? 'rgba(49, 130, 206, 0.25)'
                                            : ''
                                    }
                                    color={
                                        location.pathname ===
                                        `/account/${row.path}`
                                            ? 'blue.500'
                                            : ''
                                    }
                                    onClick={() =>
                                        router.push(`/account/${row.path}`)
                                    }
                                >
                                    <Icon
                                        fontSize="2xl"
                                        as={row.icon}
                                        weight="fill"
                                    />
                                    <Text ml="2">{row.title}</Text>
                                </Flex>
                            )
                        })}
                    </Flex>

                    <Box
                        ml="10"
                        p="12"
                        background={
                            colorMode === 'dark' ? 'gray.700' : '#f9f9f9'
                        }
                        borderRadius="md"
                        h="100%"
                    >
                        {children}
                    </Box>
                </Grid>
            </Flex>
        </Public>
    )
}

export default Account
