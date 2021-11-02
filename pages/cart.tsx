import React, { useEffect, useState } from 'react'
import { ProductsDocument } from '../src/models/products'

// Logic
import core from '../src/logic/core'
import { usePulse } from '@pulsejs/react'

// Routing
import Link from 'next/link'

// Layout
import Public from '../src/layouts/Public'

// UI
import {
    Grid,
    Box,
    Heading,
    Flex,
    Icon,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Image
} from '@chakra-ui/react'
import { ShoppingCart, Trash } from 'phosphor-react'

// Components
import Loader from '../src/components/Loader'

// Utils
import fetcher from '../src/utils/fetcher'
import useErrorHandler from '../src/utils/useErrorHandler'
import ImageParser from '../src/utils/ImageParser'

// Services
import cart from '../src/services/cart'

const Cart: React.FC = () => {
    const ErrorHandler = useErrorHandler()

    const cartState = usePulse(core.state.cart)
    const wrapperSize = usePulse(core.state.wrapperSize)

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        let productIds: string[] = []
        cartState.map((row) => productIds.push(row.product_id))

        fetcher('/api/cart', 'POST', {
            ids: productIds
        })
            .then((res) => {
                if (res.data !== false) {
                    res.data.map((row: ProductsDocument, i: number) => {
                        if (row._id === cartState[i].product_id) {
                            row.qty = cartState[i].qty
                        }
                    })

                    setCartItems(res.data)
                }
            })
            .catch((err) => ErrorHandler(err.message))
    }, [cartState])

    if (cartState.length === 0) {
        return (
            <Public>
                <Flex
                    justify="center"
                    align="center"
                    direction="column"
                    w={wrapperSize}
                    p="200px 0"
                    m="0 auto"
                >
                    <Icon fontSize="8xl" mb="25px" as={ShoppingCart} />
                    <Heading>No products in cart!</Heading>
                    <Link href="/" passHref>
                        <Button colorScheme="primary" mt="12">
                            Continue shopping
                        </Button>
                    </Link>
                </Flex>
            </Public>
        )
    }

    if (cartState) {
        return (
            <Public>
                <Grid w={wrapperSize} m="50px auto" mb="20em">
                    <Heading>Cart</Heading>

                    {cartItems.length === 0 ? (
                        <Loader />
                    ) : (
                        <Table mt="6" size="lg">
                            <Thead>
                                <Tr>
                                    <Th>Remove</Th>
                                    <Th>Image</Th>
                                    <Th>Product</Th>
                                    <Th>Price</Th>
                                    <Th>Quantity</Th>
                                    <Th>Total</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {cartItems.map(
                                    (row: ProductsDocument, i: number) => {
                                        return (
                                            <Tr key={row._id}>
                                                <Td>
                                                    <Icon
                                                        as={Trash}
                                                        weight="fill"
                                                        fontSize="xl"
                                                        cursor="pointer"
                                                        onClick={() =>
                                                            cart.remove(i)
                                                        }
                                                    />
                                                </Td>
                                                <Td>
                                                    <Image
                                                        w="50px"
                                                        h="50px"
                                                        fit="cover"
                                                        src={ImageParser(
                                                            row.image[0]
                                                        )}
                                                        alt={row.name}
                                                    />
                                                </Td>
                                                <Td>
                                                    <Link
                                                        passHref
                                                        href={`/product/${row.url}`}
                                                        key={row._id}
                                                    >
                                                        {row.name}
                                                    </Link>
                                                </Td>
                                                <Td>{row.price}€</Td>
                                                <Td>
                                                    <NumberInput
                                                        defaultValue={row.qty}
                                                        w="80px"
                                                        min={1}
                                                        max={99}
                                                    >
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </Td>
                                                {row.qty ? (
                                                    <Td>
                                                        {row.price * row.qty}€
                                                    </Td>
                                                ) : (
                                                    <></>
                                                )}
                                            </Tr>
                                        )
                                    }
                                )}
                            </Tbody>
                        </Table>
                    )}
                </Grid>
            </Public>
        )
    } else return <Loader />
}

export default Cart
