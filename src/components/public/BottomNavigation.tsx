import React from 'react'
import { NextPage } from 'next'
import { BottomNavLinks } from '../../config/types'

// Logic
import core from '../../logic/core'
import { usePulse } from '@pulsejs/react'

// Routing
import { useRouter } from 'next/router'

// UI
import {
    Flex,
    Icon,
    Text,
    Badge,
    useColorMode,
    FlexProps
} from '@chakra-ui/react'
import {
    House,
    IconProps,
    ShoppingCart,
    UserCircle,
    HeartStraight,
    MagnifyingGlass
} from 'phosphor-react'

const links: BottomNavLinks[] = [
    {
        title: 'Search',
        path: '/search',
        icon: MagnifyingGlass
    },
    {
        title: 'Account',
        path: '/account/details',
        icon: UserCircle
    },
    {
        title: 'Home',
        path: '/',
        icon: House
    },
    {
        title: 'Cart',
        path: '/cart',
        icon: ShoppingCart
    },
    {
        title: 'Wishlist',
        path: '/wishlist',
        icon: HeartStraight
    }
]

const BottomNavigation: NextPage = () => {
    const cart = usePulse(core.state.cart)

    const { colorMode, toggleColorMode } = useColorMode()

    const router = useRouter()

    return (
        <Flex
            justify="space-evenly"
            align="center"
            pos="sticky"
            bottom="0"
            h="80px"
            w="100%"
            backgroundColor={colorMode === 'dark' ? 'gray.800' : 'white'}
            borderTopWidth="1px"
            borderTopStyle="solid"
            borderTopColor="rgba(100, 100, 100, 0.25)"
            zIndex="1000"
        >
            {links.map((row, i: number) => {
                const selected = router.pathname === row.path
                return (
                    <>
                        <NavItem
                            title={row.title}
                            icon={row.icon}
                            selected={selected}
                            key={row.path}
                            onClick={() => router.push(row.path)}
                        />
                    </>
                )
            })}
        </Flex>
    )
}

export default BottomNavigation

interface NavItemProps extends FlexProps {
    icon: React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
    >
    title: string
    selected?: boolean
}

const NavItem: React.FC<NavItemProps> = (props) => {
    const cart = usePulse(core.state.cart)

    const { colorMode } = useColorMode()

    return (
        <Flex
            align="center"
            flexDir="column"
            cursor="pointer"
            pos="relative"
            color={
                colorMode === 'dark'
                    ? props.selected
                        ? 'white'
                        : 'gray.300'
                    : colorMode === 'light'
                    ? props.selected
                        ? 'black'
                        : 'gray.400'
                    : ''
            }
            {...props}
        >
            <Icon as={props.icon} weight="fill" fontSize="3xl" />
            <Text fontSize="sm">{props.title}</Text>

            {props.title === 'Cart' && cart.length > 0 && (
                <Badge
                    backgroundColor="blue.100"
                    color={colorMode === 'dark' ? 'gray.700' : ''}
                    borderRadius="full"
                    pos="absolute"
                    top="-5px"
                    right="-5px"
                    w="17px"
                    h="17px"
                >
                    {cart.length}
                </Badge>
            )}
        </Flex>
    )
}
