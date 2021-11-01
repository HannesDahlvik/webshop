import React from 'react'

// Logic
import core from '../../src/logic/core'
import { usePulse } from '@pulsejs/react'

// Layout
import Admin from '../../src/layouts/Admin'

// UI
import {
    Box,
    Heading,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from '@chakra-ui/react'

// Components
import CreateProduct from '../../src/components/admin/CreateProduct'

const Create: React.FC = () => {
    const wrapperSize = usePulse(core.state.wrapperSize)

    return (
        <Admin>
            <Box p="12">
                <Heading fontSize="5xl" textAlign="center" mb="12">
                    Create
                </Heading>

                <Tabs isFitted variant="solid-rounded">
                    <TabList
                        w={
                            wrapperSize === '90%'
                                ? '100%'
                                : wrapperSize === '2xl'
                                ? '100%'
                                : '50%'
                        }
                        margin="0 auto"
                    >
                        <Tab borderRadius="md">Product</Tab>
                        <Tab borderRadius="md" ml="4">
                            Two
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <CreateProduct />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Admin>
    )
}

export default Create
