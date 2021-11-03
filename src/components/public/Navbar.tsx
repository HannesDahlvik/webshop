import React, { useState } from 'react'
import { NavLinks } from '../../config/types'

// Logic
import core from '../../logic/core'
import { usePulse } from '@pulsejs/react'

// Routing
import Link from 'next/link'
import { useRouter } from 'next/router'

// UI
import {
    Box,
    Flex,
    Button,
    Text,
    Input,
    Grid,
    InputGroup,
    InputRightElement,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Icon,
    Divider,
    Badge,
    useColorMode
} from '@chakra-ui/react'
import {
    MagnifyingGlass,
    UserCircle,
    HeartStraight,
    ShoppingCart,
    Sun,
    Moon
} from 'phosphor-react'

// Services
import auth from '../../services/auth'

// Utils
import useInfoHandler from '../../utils/useInfoHandler'

// Compoennts
import NavLink from './NavLink'

const navLinks: NavLinks[] = [
    {
        title: 'Components',
        path: 'components'
    }
]

const Navbar: React.FC = () => {
    const user = usePulse(core.state.user)
    const cart = usePulse(core.state.cart)
    const wrapperSize = usePulse(core.state.wrapperSize)

    const InfoHandler = useInfoHandler()

    const router = useRouter()

    const { colorMode } = useColorMode()

    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (ev: React.FormEvent) => {
        ev.preventDefault()
        if (searchValue.length > 2) {
            router.push(`/search/${searchValue}`)
        } else if (searchValue.length === 0) {
            InfoHandler('Enter a search value!')
        } else if (searchValue.length < 3) {
            InfoHandler('Has to be more than 3 characters')
        } else {
            InfoHandler('Enter a search value!')
        }
    }

    return (
        <>
            <Box
                pos="sticky"
                top="0"
                zIndex="1000"
                as="nav"
                borderBottom="1px solid rgba(100, 100, 100, 0.25)"
                backgroundColor={colorMode === 'dark' ? 'gray.800' : 'white'}
            >
                <Grid
                    gridTemplateColumns="0.5fr 1.5fr 25% 1fr"
                    py="5"
                    w={wrapperSize}
                    m="0 auto"
                    alignItems="center"
                >
                    <Box mr="4">
                        <Text fontSize="xl" fontWeight="bold">
                            <Link href="/">Webshop</Link>
                        </Text>
                    </Box>

                    <Flex align="center">
                        {navLinks.map((row: NavLinks, i: number) => (
                            <NavLink {...row} key={i} />
                        ))}
                    </Flex>

                    <form onSubmit={handleSearch}>
                        <Flex mr="4">
                            <InputGroup>
                                <Input
                                    placeholder="Search"
                                    value={searchValue}
                                    onChange={(ev) =>
                                        setSearchValue(ev.target.value)
                                    }
                                />
                                <InputRightElement width="32px" right="4px">
                                    <Button
                                        variant="ghost"
                                        onClick={handleSearch}
                                    >
                                        <Icon
                                            as={MagnifyingGlass}
                                            weight="bold"
                                        />
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                    </form>

                    <Flex ml="auto">
                        <HStack spacing="4">
                            {user?.role === 'admin' ? (
                                <Link passHref href="/admin/dashboard">
                                    <Button colorScheme="green">Admin</Button>
                                </Link>
                            ) : (
                                <></>
                            )}

                            {user ? (
                                <>
                                    <ThemeChanger />

                                    <Menu>
                                        <MenuButton cursor="pointer" as={Text}>
                                            <Icon
                                                as={UserCircle}
                                                fontSize="3xl"
                                                weight="fill"
                                            />
                                        </MenuButton>
                                        <MenuList zIndex="999">
                                            <MenuItem
                                                onClick={() =>
                                                    router.push(
                                                        '/account/details'
                                                    )
                                                }
                                            >
                                                Account
                                            </MenuItem>

                                            <MenuItem
                                                onClick={() =>
                                                    router.push(
                                                        '/account/orders'
                                                    )
                                                }
                                            >
                                                My orders
                                            </MenuItem>

                                            <MenuItem
                                                onClick={() =>
                                                    router.push(
                                                        '/account/settings'
                                                    )
                                                }
                                            >
                                                Settings
                                            </MenuItem>

                                            <Divider />

                                            <MenuItem
                                                onClick={() =>
                                                    core.events.logout.emit()
                                                }
                                            >
                                                Logout
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <HStack>
                                        <Link passHref href="/login">
                                            <Button>Login</Button>
                                        </Link>
                                        <Link passHref href="/signup">
                                            <Button>Signup</Button>
                                        </Link>
                                    </HStack>

                                    <ThemeChanger />
                                </>
                            )}

                            <Link passHref href="/wishlist">
                                <Icon
                                    as={HeartStraight}
                                    weight="fill"
                                    cursor="pointer"
                                    fontSize="3xl"
                                />
                            </Link>

                            <Link passHref href="/cart">
                                <Box pos="relative" w="36px">
                                    <Icon
                                        as={ShoppingCart}
                                        weight="fill"
                                        fontSize="3xl"
                                        cursor="pointer"
                                    />
                                    {cart.length > 0 ? (
                                        <Badge
                                            backgroundColor="blue.100"
                                            color={
                                                colorMode === 'dark'
                                                    ? 'gray.700'
                                                    : ''
                                            }
                                            borderRadius="full"
                                            pos="absolute"
                                            top="0"
                                            right="0"
                                            w="17px"
                                            h="17px"
                                        >
                                            {cart.length}
                                        </Badge>
                                    ) : (
                                        <></>
                                    )}
                                </Box>
                            </Link>
                        </HStack>
                    </Flex>
                </Grid>
            </Box>
        </>
    )
}

export default Navbar

const ThemeChanger = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Icon
            as={colorMode === 'dark' ? Sun : Moon}
            cursor="pointer"
            weight="fill"
            fontSize="2xl"
            onClick={toggleColorMode}
        />
    )
}
