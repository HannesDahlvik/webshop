import React, { useEffect, useState } from 'react'

// Routing
import { useRouter } from 'next/router'

// Logic
import core from '../logic/core'
import { usePulse } from '@pulsejs/react'

// UI
import { Flex, Box } from '@chakra-ui/react'

// Components
import AdminSidebar from '../components/admin/Sidebar'
import Loader from '../components/Loader'

const Admin: React.FC = ({ children }) => {
    const user = usePulse(core.state.user)

    const router = useRouter()

    const [render, setRender] = useState(false)

    useEffect(() => {
        if (user.role !== 'admin') {
            router.push('/')
        } else setRender(true)
    }, [user])

    if (render) {
        return (
            <Flex>
                <AdminSidebar />

                <Box w="100%" p="4">
                    {children}
                </Box>
            </Flex>
        )
    } else return <Loader />
}

export default Admin
