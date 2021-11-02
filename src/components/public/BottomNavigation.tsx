import React from 'react'
import { NextPage } from 'next'
import { BottomNavLinks } from '../../config/types'

// Routing
import { useRouter } from 'next/router'

// UI
import { Flex, Icon, Text, useColorMode, FlexProps } from '@chakra-ui/react'
import { House, IconProps, ShoppingCart, UserCircle } from 'phosphor-react'

const links: BottomNavLinks[] = [
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
    }
]

const BottomNavigation: NextPage = () => {
    const { colorMode } = useColorMode()

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
            zIndex="1000"
        >
            {links.map((row, i: number) => {
                const selected = router.pathname === row.path

                return (
                    <NavItem
                        title={row.title}
                        icon={row.icon}
                        selected={selected}
                        key={i}
                        onClick={() => router.push(row.path)}
                    />
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
    return (
        <Flex
            align="center"
            flexDir="column"
            cursor="pointer"
            color={props.selected ? 'white' : 'gray.300'}
            {...props}
        >
            <Icon as={props.icon} weight="fill" fontSize="3xl" />
            <Text>{props.title}</Text>
        </Flex>
    )
}
