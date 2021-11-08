import React, { useEffect, useState } from 'react'
import { ProductsDocument } from '../../src/models/products'

// Logic
import core from '../../src/logic/core'
import { useEvent } from '@pulsejs/react'

// Layout
import Admin from '../../src/layouts/Admin'

// UI
import {
    Box,
    Flex,
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
    MenuDivider,
    Input,
    InputGroup,
    InputRightElement,
    Heading
} from '@chakra-ui/react'
import {
    DotsThreeOutlineVertical,
    MagnifyingGlass,
    Pencil,
    Trash
} from 'phosphor-react'

// Components
import EditProductModal from '../../src/components/admin/EditProductModal'
import DeleteProductModal from '../../src/components/admin/DeleteProductModal'
import Loader from '../../src/components/Loader'

// Utils
import fetcher from '../../src/utils/fetcher'
import ImageParser from '../../src/utils/ImageParser'
import useErrorHandler from '../../src/utils/useErrorHandler'
import Fuse from 'fuse.js'

const Products: React.FC = () => {
    const ErrorHandler = useErrorHandler()

    const [data, setData] = useState<ProductsDocument[]>([])
    const [allData, setAllData] = useState<ProductsDocument[]>([])
    const [noData, setNoData] = useState(false)

    const [searchValue, setSerachValue] = useState('')

    const [selectedProducts, setSelectedProducts] = useState<
        ProductsDocument[]
    >([])

    useEvent(core.events.fetchProductsList, () => {
        fetchProducts()
    })

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        handleSearch()
    }, [searchValue])

    const fetchProducts = () => {
        fetcher('/api/all', 'GET')
            .then((res) => {
                const data: ProductsDocument[] = res.data
                setData(data)
                setAllData(data)
                if (data.length === 0) setNoData(true)
            })
            .catch((err) => ErrorHandler(err))
    }

    const handleSearch = () => {
        const fuse = new Fuse(allData, {
            keys: ['name', 'description']
        }).search(searchValue)

        const arr: ProductsDocument[] = []
        fuse.map((row) => arr.push(row.item))
        setData(arr)

        if (searchValue.length === 0) setData(allData)
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
            <EditProductModal />
            <DeleteProductModal />

            <Box>
                <Flex w="100%">
                    <Flex align="center" ml="auto">
                        <InputGroup>
                            <Input
                                placeholder="Search"
                                value={searchValue}
                                onChange={(ev) =>
                                    setSerachValue(ev.target.value)
                                }
                            />
                            <InputRightElement>
                                <Icon
                                    as={MagnifyingGlass}
                                    weight="bold"
                                    fontSize="xl"
                                    cursor="pointer"
                                />
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                </Flex>

                {data.length > 0 ? (
                    <>
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
                                                        handleCheckedChange(
                                                            row,
                                                            ev
                                                        )
                                                    }
                                                />
                                            </Td>
                                            <Td>
                                                <Image
                                                    w="48px"
                                                    h="48px"
                                                    objectFit="cover"
                                                    src={ImageParser(
                                                        row.image[0]
                                                    )}
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
                                                        <MenuItem
                                                            onClick={() =>
                                                                core.events.editProduct.emit(
                                                                    row
                                                                )
                                                            }
                                                        >
                                                            <Icon
                                                                as={Pencil}
                                                                weight="fill"
                                                                cursor="pointer"
                                                                mr="2"
                                                            />
                                                            Edit
                                                        </MenuItem>

                                                        <MenuDivider />

                                                        <MenuItem
                                                            color="red.400"
                                                            onClick={() =>
                                                                core.events.deleteProduct.emit(
                                                                    [row]
                                                                )
                                                            }
                                                        >
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
                    </>
                ) : noData ? (
                    <Flex justify="center" align="center" pt="10">
                        <Heading>No products</Heading>
                    </Flex>
                ) : (
                    <Loader />
                )}
            </Box>
        </Admin>
    )
}

export default Products
