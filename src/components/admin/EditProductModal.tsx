import React, { useEffect, useState } from 'react'
import { ProductsDocument } from '../../models/products'

// Logic
import core from '../../logic/core'
import { useEvent } from '@pulsejs/react'

// UI
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    Button,
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react'

// Utils
import fetcher from '../../utils/fetcher'
import useInfoHandler from '../../utils/useInfoHandler'
import useErrorHandler from '../../utils/useErrorHandler'

const EditProductModal: React.FC = () => {
    const InfoHandler = useInfoHandler()
    const ErrorHandler = useErrorHandler()

    const [open, setOpen] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const [data, setData] = useState<ProductsDocument | null>(null)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    useEvent(core.events.editProduct, (payload) => {
        setData(payload)
        setName(payload.name)
        setDescription(payload.description)
        setPrice(String(payload.price))
        setOpen(true)
    })

    useEffect(() => {
        if (data) {
            if (name.length > 2 && name !== data.name) setDisabled(false)
            else if (description.length > 2 && description !== data.description)
                setDisabled(false)
            else if (price !== String(data.price)) setDisabled(false)
            else setDisabled(true)
        }
    }, [name, description, price])

    const handleClose = () => {
        setName('')
        setDescription('')
        setPrice('')
        setDisabled(true)

        setOpen(false)
    }

    const handleSave = () => {
        setLoading(true)

        fetcher('/api/product/edit', 'POST', {
            _id: data._id,
            name,
            description,
            price: parseFloat(price)
        })
            .then((res) => {
                const data = res.data
                setLoading(false)

                if (data.error) {
                    ErrorHandler(data.error)
                } else {
                    handleClose()
                    InfoHandler(data.message)
                }

                core.events.fetchProductsList.emit()
            })
            .catch((err) => ErrorHandler(err))
    }

    if (data !== null) {
        return (
            <Modal isOpen={open} onClose={handleClose} size="3xl">
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Edit {data.name}</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Box w="75%" m="0 auto">
                            <FormControl mb="4">
                                <FormLabel>Name</FormLabel>
                                <Input
                                    value={name}
                                    onChange={(ev) => setName(ev.target.value)}
                                />
                            </FormControl>

                            <FormControl mb="4">
                                <FormLabel>Price</FormLabel>
                                <NumberInput
                                    min={0}
                                    precision={2}
                                    step={0.5}
                                    value={price}
                                    onChange={(ev) => setPrice(ev)}
                                >
                                    <NumberInputField placeholder="9.99" />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>

                            <FormControl mb="4">
                                <FormLabel>Card Description</FormLabel>
                                <Input
                                    value={description}
                                    onChange={(ev) =>
                                        setDescription(ev.target.value)
                                    }
                                />
                            </FormControl>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr="3" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="primary"
                            isDisabled={disabled}
                            isLoading={loading}
                            loadingText="Saving"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    } else return <></>
}

export default EditProductModal
