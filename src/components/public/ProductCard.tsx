import React from 'react'
import { ProductsDocument } from '../../models/products'

// Routing
import Link from 'next/link'

// UI
import { Box, Image, Heading, Text, Button, Icon } from '@chakra-ui/react'
import { ShoppingCart } from 'phosphor-react'

// Services
import cart from '../../services/cart'

// Utils
import useInfoHandler from '../../utils/useInfoHandler'
import useErrorHandler from '../../utils/useErrorHandler'
import ImageParser from '../../utils/ImageParser'

const ProductCard: React.FC<ProductsDocument> = (props) => {
    const InfoHandler = useInfoHandler()
    const ErrorHandler = useErrorHandler()

    const handleAddToCart = () => {
        if (props)
            cart.add(props._id, 1)
                .then((res) => {
                    InfoHandler(res)
                })
                .catch((err) => ErrorHandler(err.message))
    }

    return (
        <Box
            minH="350"
            border="1px solid rgba(100, 100, 100, 0.25)"
            borderRadius="lg"
        >
            <Box h="175">
                <Link passHref href={`/product/${props.url}`}>
                    <Image
                        cursor="pointer"
                        h="100%"
                        w="100%"
                        borderTopLeftRadius="5px"
                        borderTopRightRadius="5px"
                        fit="cover"
                        src={ImageParser(props.image[0])}
                        alt={props.name}
                        fallbackSrc={ImageParser('placeholder')}
                    />
                </Link>
            </Box>

            <Box p="6">
                <Link passHref href={`/product/${props.url}`}>
                    <Box cursor="pointer">
                        <Heading size="md" noOfLines={2}>
                            {props.name}
                        </Heading>
                        <Text noOfLines={1}>{props.description}</Text>
                        <Text>{props.price}€</Text>
                    </Box>
                </Link>

                <Button
                    colorScheme="primary"
                    mt="4"
                    zIndex="999"
                    onClick={() => handleAddToCart()}
                >
                    <Icon as={ShoppingCart} weight="fill" fontSize="2xl" />
                </Button>
            </Box>
        </Box>
    )
}

export default ProductCard
