import React, { useEffect, useRef, useState } from 'react'
import { ProductField } from '../../config/types'

// Logic
import core from '../../logic/core'
import { useEvent, usePulse } from '@pulsejs/react'

// UI
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Tooltip,
    Icon,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    Heading,
    Editable,
    EditableInput,
    EditablePreview,
    Tag,
    TagLabel,
    Image
} from '@chakra-ui/react'
import { Plus, Question, Trash } from 'phosphor-react'

// Utils
import useInfoHandler from '../../utils/useInfoHandler'
import useErrorHandler from '../../utils/useErrorHandler'
import fetcher from '../../utils/fetcher'

// Components
import AddFieldModal from './AddFieldModal'
import ImageParser from '../../utils/ImageParser'

const CreateProduct: React.FC = () => {
    const InfoHandler = useInfoHandler()
    const ErrorHandler = useErrorHandler()

    const wrapperSize = usePulse(core.state.wrapperSize)

    const fileInput = useRef<HTMLInputElement>(null)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [fields, setFields] = useState<ProductField[]>([
        {
            type: 'text',
            textTitle: 'Description',
            textValue: ''
        }
    ])
    const [files, setFiles] = useState<string[]>([])

    const [disabled, setDisabled] = useState(true)

    console.log(files)

    useEffect(() => {
        if (
            name.length > 2 &&
            parseFloat(price) > 0 &&
            desc.length > 2 &&
            files.length > 0
        )
            setDisabled(false)
        else setDisabled(true)
    }, [name, price, desc, files])

    useEvent(core.events.handleAddProductField, (payload) => {
        const arr = [...fields]
        arr.push(payload)
        setFields(arr)
    })

    const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!ev.target.files?.length) return

        const evFiles = ev.target.files
        const formData = new FormData()
        for (let i = 0; i < evFiles.length; i++) {
            formData.append('file', evFiles[i])
        }

        fetcher('/api/image/upload', 'POST', formData, {
            'Content-Type': 'multipart/form-data'
        }).then((res) => {
            const data = res.data
            console.log(data)

            if (data.success) {
                InfoHandler(data.message)

                let arr: string[] = [...files]
                data.files.map((row: any) => {
                    arr.push(row.filename)
                })

                setFiles(arr)
            } else {
                ErrorHandler(data.message)
            }
        })
    }

    const handleRemoveImage = (num: number, imageName: string) => {
        fetcher(`/api/image/remove`, 'POST', {
            files: [imageName]
        })
            .then((res) => {
                const data = res.data

                if (data.success) {
                    InfoHandler(data.message)
                    const images = [...files]
                    images.splice(num, 1)
                    setFiles([...images])
                } else {
                    ErrorHandler(data.message)
                }
            })
            .catch((err) => ErrorHandler(err))
    }

    const clearValues = () => {
        setName('')
        setPrice('')
        setDesc('')
        setFiles([])
        setFields([])
    }

    const handleSubmit = () => {
        fetcher('/api/product/create-product', 'POST', {
            name,
            description: desc,
            price,
            image: files,
            fields
        })
            .then((res) => {
                if (!res.data.success) {
                    if (res.data.err) {
                        return ErrorHandler(res.data.err.message)
                    }
                }

                if (res.data.success) {
                    clearValues()
                    InfoHandler('Created product!')
                }
            })
            .catch((err) => ErrorHandler(err.message))
    }

    const handleRemoveField = (index: number) => {
        const arr = [...fields]
        arr.splice(index, 1)
        setFields(arr)
    }

    return (
        <>
            <AddFieldModal />

            <Flex
                flexDir="column"
                w={
                    wrapperSize === '90%'
                        ? '100%'
                        : wrapperSize === '2xl'
                        ? '100%'
                        : '50%'
                }
                m="0 auto"
                mt="8"
            >
                <FormControl mb="2">
                    <Heading>General Info</Heading>
                </FormControl>

                <FormControl mb="6" isRequired>
                    <Label>
                        Name
                        <FormHelper label="The name of the product!" />
                    </Label>

                    <Input
                        placeholder="eg. Ryzen 5 2600X"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                </FormControl>

                <FormControl mb="6" isRequired>
                    <Label>
                        Price
                        <FormHelper label="Price of the product" />
                    </Label>

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

                <FormControl mb="6" isRequired>
                    <FormLabel>
                        Card Description
                        <FormHelper label="Text will be shown on product cards" />
                    </FormLabel>

                    <Input
                        placeholder="eg. Lorem ipsum dolor sit."
                        value={desc}
                        onChange={(ev) => setDesc(ev.target.value)}
                    />
                </FormControl>

                <FormControl mb="2">
                    <Heading>Fields</Heading>
                </FormControl>

                {fields.map((row, i: number) => {
                    return (
                        <FormControl mb="4" key={i}>
                            <Label>
                                <Editable defaultValue={row.textTitle}>
                                    <EditablePreview />
                                    <EditableInput />
                                </Editable>
                                <FormHelper label="The longer description for the page!" />

                                <Icon
                                    ml="auto"
                                    as={Trash}
                                    weight="fill"
                                    fontSize="lg"
                                    cursor="pointer"
                                    onClick={() => handleRemoveField(i)}
                                />
                            </Label>

                            <Textarea
                                h="250px"
                                resize="none"
                                placeholder="Lorem ipsum dolor sit."
                                defaultValue={row.textValue}
                                onChange={(ev) => {
                                    row.textValue = ev.target.value
                                }}
                            />
                        </FormControl>
                    )
                })}
                <Button
                    size="sm"
                    w="100%"
                    mb="4"
                    onClick={() => core.events.addProductField.emit()}
                >
                    <Icon as={Plus} mr="1" /> Add Field
                </Button>

                <FormControl mb="6" isRequired>
                    <Label>
                        Category
                        <FormHelper label="Category for the product!" />
                    </Label>

                    <Tag size="lg" colorScheme="primary" cursor="pointer">
                        <TagLabel>test</TagLabel>
                    </Tag>
                </FormControl>

                <FormControl mb="6" isRequired>
                    <Label>
                        Images
                        <FormHelper label="Images for the product!" />
                    </Label>

                    <Button
                        size="sm"
                        w="100%"
                        mb="2"
                        onClick={() => fileInput.current?.click()}
                    >
                        <Icon as={Plus} mr="1" /> Add Image
                    </Button>

                    <Flex
                        w="100%"
                        h="100%"
                        minH="250px"
                        borderWidth="1px"
                        borderStyle="solid"
                        borderRadius="md"
                        pos="relative"
                    >
                        <Box w="100%" h="100%">
                            {files.length !== 0 && (
                                <Flex
                                    justify="center"
                                    flexWrap="wrap"
                                    p="4"
                                    pb="0"
                                >
                                    {files.map((row, i: number) => (
                                        <Flex
                                            w="250px"
                                            h="250px"
                                            mr="4"
                                            mb="4"
                                            key={i}
                                            pos="relative"
                                        >
                                            <Icon
                                                as={Trash}
                                                weight="fill"
                                                pos="absolute"
                                                top="10px"
                                                right="10px"
                                                fontSize="xl"
                                                cursor="pointer"
                                                onClick={() =>
                                                    handleRemoveImage(i, row)
                                                }
                                            />

                                            <Image
                                                borderRadius="md"
                                                objectFit="cover"
                                                src={ImageParser(row)}
                                                alt={ImageParser('placeholder')}
                                            />
                                        </Flex>
                                    ))}
                                </Flex>
                            )}
                        </Box>

                        <Input
                            accept="image/*"
                            ref={fileInput}
                            display="none"
                            type="file"
                            onInput={handleInputChange}
                        />
                    </Flex>
                </FormControl>

                <Button
                    colorScheme="primary"
                    isDisabled={disabled}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Flex>
        </>
    )
}

export default CreateProduct

const FormHelper: React.FC<{
    label: string
}> = (props) => {
    return (
        <Tooltip label={props.label} placement="top">
            <Icon ml="1" as={Question} weight="fill" />
        </Tooltip>
    )
}

const Label: React.FC = ({ children }) => {
    return (
        <FormLabel display="flex" alignItems="center">
            {children}
        </FormLabel>
    )
}
