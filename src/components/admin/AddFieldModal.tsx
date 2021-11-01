import React, { useState } from 'react'
import { ProductField } from '../../config/types'

// Logic
import core from '../../logic/core'
import { useEvent } from '@pulsejs/react'

// UI
import {
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Button,
    Textarea,
    Input
} from '@chakra-ui/react'

const AddFieldModal: React.FC = () => {
    const [open, setOpen] = useState(false)

    const [type, setType] = useState(0)

    const [textTitle, setTextTitle] = useState('')
    const [textValue, setTextValue] = useState('')

    useEvent(core.events.addProductField, () => {
        setOpen(true)
    })

    const handleClose = () => {
        setTextTitle('')
        setTextValue('')
        setOpen(false)
    }

    const handleAddField = () => {
        let payload: ProductField = {
            type: 'text'
        }

        if (type === 0) {
            payload = {
                type: 'text',
                textTitle,
                textValue
            }
        }

        core.events.handleAddProductField.emit(payload)
        handleClose()
    }

    return (
        <Modal size="3xl" isOpen={open} onClose={handleClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Add product field</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <FormControl>
                        <FormLabel>Type</FormLabel>
                    </FormControl>

                    <Tabs
                        isFitted
                        index={type}
                        onChange={(index) => setType(index)}
                    >
                        <TabList>
                            <Tab>Text</Tab>
                            <Tab>Two</Tab>
                            <Tab>Three</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel p="0" pt="4">
                                <FormControl mb="6" isRequired>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        value={textTitle}
                                        onChange={(ev) =>
                                            setTextTitle(ev.target.value)
                                        }
                                    />
                                </FormControl>

                                <FormControl mb="6" isRequired>
                                    <FormLabel>Value</FormLabel>
                                    <Textarea
                                        resize="none"
                                        height="250px"
                                        value={textValue}
                                        onChange={(ev) =>
                                            setTextValue(ev.target.value)
                                        }
                                    />
                                </FormControl>
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>three!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={handleClose}>
                        Close
                    </Button>
                    <Button colorScheme="primary" onClick={handleAddField}>
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddFieldModal
