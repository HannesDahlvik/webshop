import React, { useEffect, useRef, useState } from 'react'

// Logic
import core from '../../logic/core'
import { usePulse } from '@pulsejs/react'

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

const CreateProduct: React.FC = () => {
    const InfoHandler = useInfoHandler()
    const ErrorHandler = useErrorHandler()

    const wrapperSize = usePulse(core.state.wrapperSize)

    const fileInput = useRef<HTMLInputElement>(null)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [fields, setFields] = useState<any[]>([
        {
            title: 'Description',
            value: ''
        }
    ])

    const [disabled, setDisabled] = useState(true)

    const [previews, setPreviews] = useState<any[]>([])

    useEffect(() => {
        if (name.length > 2 && parseFloat(price) > 0 && desc.length > 2)
            setDisabled(false)
        else setDisabled(true)
    }, [name, price, desc])

    const handleInputChange = (ev: any) => {
        ev.preventDefault()

        const file = ev.target.files[0]
        const arr = [...previews]

        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => {
            if (reader.result) arr.push(reader.result)
            setPreviews(arr)
        }
        reader.onerror = () => {
            ErrorHandler('There was an error with image upload!')
        }
    }

    const handleRemoveImage = (num: number) => {
        let images = [...previews]
        images.splice(num, 1)
        setPreviews([...images])
    }

    const clearValues = () => {
        setName('')
        setPrice('0.00')
        setDesc('')
        setPreviews([])
    }

    const handleAddField = () => {}

    const handleSubmit = () => {
        fetcher('/api/createProduct', 'POST', {
            name,
            description: desc,
            price
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
            .catch((err) => ErrorHandler(err))
    }

    return (
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

            <FormControl mt="4">
                <Heading>Fields</Heading>
            </FormControl>

            {fields.map((row, i: number) => {
                return (
                    <FormControl mt="6" isRequired key={i}>
                        <Label>
                            <Editable defaultValue={row.title}>
                                <EditablePreview />
                                <EditableInput />
                            </Editable>
                            <FormHelper label="The longer description for the page!" />
                        </Label>

                        <Textarea
                            h="250px"
                            resize="none"
                            placeholder="Lorem ipsum dolor sit."
                            defaultValue={row.value}
                            onChange={(ev) => {
                                row.value = ev.target.value
                            }}
                        />
                    </FormControl>
                )
            })}
            <Button size="sm" w="100%" my="2" onClick={handleAddField}>
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
                        {previews.length !== 0 && (
                            <Flex justify="center" flexWrap="wrap" p="4" pb="0">
                                {previews.map((row, i: number) => (
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
                                            onClick={() => handleRemoveImage(i)}
                                        />

                                        <Image
                                            borderRadius="md"
                                            objectFit="cover"
                                            src={row}
                                            alt={`preview-image-${i}`}
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
                        onChange={handleInputChange}
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

            {/* Basically todoo is create category selecting and file/image upload maybe video😮 (at some point) */}
        </Flex>
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
