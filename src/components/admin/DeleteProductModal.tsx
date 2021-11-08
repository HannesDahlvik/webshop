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

const DeleteProductModal: React.FC = () => {
    const InfoHandler = useInfoHandler()
    const ErrorHandler = useErrorHandler()

    const [open, setOpen] = useState(false)

    const [data, setData] = useState<ProductsDocument[] | null>(null)

    useEvent(core.events.deleteProduct, (payload) => {
        setData(payload)
        setOpen(true)
    })

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        const ids: string[] = []
        data.map((row) => ids.push(row._id))

        fetcher('/api/product/delete', 'POST', {
            ids
        })
            .then((res) => {
                const data = res.data

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

    if (!data) return <></>

    if (data !== null)
        return (
            <Modal isOpen={open} onClose={handleClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Delete</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody textAlign="center">
                        <Button
                            size="lg"
                            colorScheme="primary"
                            loadingText="Saving"
                            onClick={handleDelete}
                            my="4"
                        >
                            Delete
                        </Button>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr="3" onClick={handleClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
}

export default DeleteProductModal
