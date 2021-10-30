import React from 'react'

// Routing
import Link from 'next/link'

// UI
import { Link as ChakraLink } from '@chakra-ui/react'

interface Props {
    title: string
    path: string
}

const NavLink: React.FC<Props> = (props) => {
    return (
        <ChakraLink
            as={Link}
            href={`/category/${props.path}`}
            display="flex"
            alignItems="center"
            h="100%"
            transition=".25s"
        >
            {props.title}
        </ChakraLink>
    )
}

export default NavLink
