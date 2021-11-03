import React, { useEffect, useState } from 'react'
import { ProductField } from '../../src/config/types'
import { ProductsDocument } from '../../src/models/products'

// Logic
import core from '../../src/logic/core'
import { usePulse } from '@pulsejs/react'

// Routing
import { useRouter } from 'next/router'
import Head from 'next/head'

// Layout
import Public from '../../src/layouts/Public'

// UI
import {
    Grid,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Heading,
    Text,
    Flex,
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    HStack,
    Image,
    Icon,
    useColorMode
} from '@chakra-ui/react'
import { CaretLeft, CaretRight, HeartStraight } from 'phosphor-react'

// Components
import Loader from '../../src/components/Loader'

// Utils
import useInfoHandler from '../../src/utils/useInfoHandler'
import useErrorHandler from '../../src/utils/useErrorHandler'
import ImageParser from '../../src/utils/ImageParser'
import fetcher from '../../src/utils/fetcher'

// Services
import cart from '../../src/services/cart'

const ProductPage: React.FC = () => {
    const InfoHandler = useInfoHandler()
    const ErrorHandler = useErrorHandler()

    const wrapperSize = usePulse(core.state.wrapperSize)

    const router = useRouter()
    const { product_url } = router.query

    const { colorMode } = useColorMode()

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<ProductsDocument | null>(null)
    const [qty, setQty] = useState(1)
    const [imageIndex, setImageIndex] = useState(0)

    useEffect(() => {
        if (product_url) {
            fetcher(`/api/product/${product_url}`, 'GET')
                .then((res) => {
                    if (res.data) {
                        core.events.changeTitle.emit(
                            `Webshop | ${res.data.name}`
                        )
                        setData(res.data)
                        setLoading(false)
                    }
                })
                .catch((err) => ErrorHandler(err.message))
        }
    }, [])

    const handleAddToCart = () => {
        if (data)
            cart.add(data?._id, qty)
                .then((res) => {
                    InfoHandler(res)
                })
                .catch((err) => ErrorHandler(err.message))
    }

    const handleImageChange = (type: 'next' | 'prev') => {
        if (data) {
            let imageIndexInstance = imageIndex
            if (type === 'next') {
                if (imageIndexInstance === data.image.length - 1)
                    imageIndexInstance = 0
                else imageIndexInstance++
            } else {
                if (imageIndexInstance === 0)
                    imageIndexInstance = data.image.length - 1
                else imageIndexInstance--
            }
            setImageIndex(imageIndexInstance)
        }
    }

    if (!data) return <Loader />

    if (data !== null && data.image) {
        return (
            <Public>
                <Grid
                    gridTemplateColumns="2fr 1fr"
                    h="calc(100vh - 80px)"
                    pos="relative"
                    className="product-page"
                >
                    <Grid
                        h="100%"
                        pb="2"
                        templateRows="3.5fr 1fr"
                        backgroundColor={
                            colorMode === 'dark' ? 'gray.700' : '#eef1f7'
                        }
                    >
                        <Flex
                            justify="center"
                            align="center"
                            backgroundImage={ImageParser(
                                data.image[imageIndex]
                            )}
                            backgroundPosition="center"
                            backgroundSize="contain"
                            backgroundRepeat="no-repeat"
                        >
                            <Flex
                                justify="space-between"
                                w="100%"
                                mx={
                                    wrapperSize === '90%'
                                        ? '1'
                                        : wrapperSize === '2xl'
                                        ? '4'
                                        : '48px'
                                }
                                fontSize="3xl"
                            >
                                <Icon
                                    as={CaretLeft}
                                    fontSize="6xl"
                                    cursor="pointer"
                                    onClick={() => handleImageChange('prev')}
                                />
                                <Icon
                                    as={CaretRight}
                                    fontSize="6xl"
                                    cursor="pointer"
                                    onClick={() => handleImageChange('next')}
                                />
                            </Flex>
                            <Box
                                pos="absolute"
                                left={wrapperSize === '90%' ? '4' : '50'}
                                top={wrapperSize === '90%' ? '4' : '50'}
                            >
                                <Heading
                                    fontSize={
                                        wrapperSize === '90%' ? '2xl' : '4xl'
                                    }
                                >
                                    {data.name}
                                </Heading>
                                <Text
                                    mt={wrapperSize === '90%' ? '1' : '2'}
                                    fontSize={
                                        wrapperSize === '90%' ? 'xl' : '4xl'
                                    }
                                >
                                    {data.price}€
                                </Text>
                            </Box>
                        </Flex>

                        <Flex justify="center" h="100%">
                            {data.image.map((row, i: number) => {
                                return (
                                    <Box
                                        key={i}
                                        w="100px"
                                        h="100px"
                                        mx="12px"
                                        transition=".25s"
                                        cursor="pointer"
                                        style={{
                                            filter:
                                                imageIndex === i
                                                    ? 'grayscale(0%)'
                                                    : 'grayscale(100%)',
                                            borderBottom:
                                                imageIndex === i
                                                    ? '2px solid #3182ce'
                                                    : '2px solid #b1b5b9'
                                        }}
                                        onClick={() => setImageIndex(i)}
                                    >
                                        <Image
                                            src={ImageParser(row)}
                                            alt={row}
                                            fallbackSrc={ImageParser(
                                                'placeholder'
                                            )}
                                        />
                                    </Box>
                                )
                            })}
                        </Flex>
                    </Grid>

                    <Flex
                        h="100%"
                        borderLeft="1px solid rgba(100, 100, 100, 0.25)"
                        py="12"
                        direction="column"
                    >
                        <Accordion defaultIndex={[0]} allowMultiple>
                            {data.fields.map((row: ProductField) => {
                                if (row.type === 'text')
                                    return (
                                        <AccordionItem
                                            px="12"
                                            key={row.textTitle}
                                        >
                                            <h2>
                                                <AccordionButton>
                                                    <Box
                                                        flex="1"
                                                        textAlign="left"
                                                    >
                                                        {row.textTitle}
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>

                                            <AccordionPanel pb="4">
                                                {row.textValue}
                                            </AccordionPanel>
                                        </AccordionItem>
                                    )
                            })}
                        </Accordion>

                        <HStack
                            mt="auto"
                            px={wrapperSize === '90%' ? '2' : '12'}
                        >
                            <NumberInput
                                w="125px"
                                min={1}
                                max={99}
                                value={qty}
                                onChange={(ev) => setQty(Number(ev))}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                            <Button
                                isFullWidth
                                ml="4"
                                colorScheme="primary"
                                onClick={handleAddToCart}
                            >
                                Add to cart
                            </Button>

                            <Button
                                variant="outline"
                                ml="4"
                                colorScheme="primary"
                                // onClick={handleAddToWishlist}
                            >
                                <Icon as={HeartStraight} weight="fill" />
                            </Button>
                        </HStack>
                    </Flex>
                </Grid>
            </Public>
        )
    } else return <Loader />
}

export default ProductPage
