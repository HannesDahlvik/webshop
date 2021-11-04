import React, { useEffect, useState } from 'react'
import { ProductsDocument } from '../../src/models/products'

// Layout
import Admin from '../../src/layouts/Admin'

// UI
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Icon,
    Image,
    Checkbox,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
} from '@chakra-ui/react'
import { DotsThreeOutlineVertical, Pencil, Trash } from 'phosphor-react'

// Utils
import fetcher from '../../src/utils/fetcher'
import ImageParser from '../../src/utils/ImageParser'
import useErrorHandler from '../../src/utils/useErrorHandler'

const List: React.FC = () => {
    const ErrorHandler = useErrorHandler()

    const [data, setData] = useState<ProductsDocument[]>([])
    const [noData, setNoData] = useState(false)

    const [selectedProducts, setSelectedProducts] = useState<
        ProductsDocument[]
    >([])

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = () => {
        fetcher('/api/all', 'GET')
            .then((res) => {
                const data: ProductsDocument[] = res.data
                setData(data)
                if (data.length === 0) setNoData(true)
            })
            .catch((err) => ErrorHandler(err))
    }

    const handleCheckedChange = (
        product: ProductsDocument,
        ev: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (ev.target.checked) {
            const arr = [...selectedProducts]
            arr.push(product)
            setSelectedProducts(arr)
        } else {
            const arr = [...selectedProducts]
            arr.splice(arr.indexOf(product), 1)
            setSelectedProducts(arr)
        }
    }

    return (
        <Admin>
            <Box>
                <Heading>Products</Heading>

                <Table mt="4">
                    <Thead>
                        <Tr>
                            <Th>Select</Th>
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Price</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {data.map((row, i: number) => {
                            return (
                                <Tr key={i}>
                                    <Td>
                                        <Checkbox
                                            ml="3"
                                            onChange={(ev) =>
                                                handleCheckedChange(row, ev)
                                            }
                                        />
                                    </Td>
                                    <Td>
                                        <Image
                                            w="48px"
                                            h="48px"
                                            objectFit="cover"
                                            src={ImageParser(row.image[0])}
                                            alt={row.name}
                                        />
                                    </Td>
                                    <Td>{row.name}</Td>
                                    <Td>{row.description}</Td>
                                    <Td>{row.price}</Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton ml="5">
                                                <Icon
                                                    as={
                                                        DotsThreeOutlineVertical
                                                    }
                                                    weight="fill"
                                                    cursor="pointer"
                                                    fontSize="xl"
                                                />
                                            </MenuButton>

                                            <MenuList>
                                                <MenuItem>
                                                    <Icon
                                                        as={Pencil}
                                                        weight="fill"
                                                        cursor="pointer"
                                                        mr="2"
                                                    />
                                                    Edit
                                                </MenuItem>

                                                <MenuDivider />

                                                <MenuItem color="red.400">
                                                    <Icon
                                                        as={Trash}
                                                        weight="fill"
                                                        cursor="pointer"
                                                        mr="2"
                                                    />
                                                    Delete
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </Box>
        </Admin>
    )
}

export default List
