import React, { useEffect, useState } from 'react'
import { ProductsDocument } from '../../src/models/products'

// Logic
import core from '../../src/logic/core'
import { usePulse } from '@pulsejs/react'

// Routing
import { useRouter } from 'next/router'

// Layout
import Public from '../../src/layouts/Public'

// UI
import {
    Box,
    Grid,
    Heading,
    InputGroup,
    Input,
    InputRightElement,
    Icon
} from '@chakra-ui/react'
import { MagnifyingGlass } from 'phosphor-react'

// Components
import ProductCard from '../../src/components/public/ProductCard'
import Loader from '../../src/components/Loader'

// Utils
import fetcher from '../../src/utils/fetcher'
import useErrorHandler from '../../src/utils/useErrorHandler'

const Search: React.FC = () => {
    const ErrorHandler = useErrorHandler()

    const wrapperSize = usePulse(core.state.wrapperSize)
    const searchValue = usePulse(core.state.searchValue)

    const router = useRouter()
    const { search_value } = router.query

    const [data, setData] = useState<ProductsDocument[]>([])
    const [noProducts, setNoProducts] = useState(false)

    useEffect(() => {
        handleSearch()
    }, [router.asPath])

    const handleSearch = () => {
        fetcher(`/api/search/${search_value}`, 'GET')
            .then((res) => {
                handleResponse(res)
            })
            .catch((err) => ErrorHandler(err.message))
    }

    const handleNewSearch = (ev: React.FormEvent) => {
        ev.preventDefault()

        fetcher(`/api/search/${searchValue}`, 'GET')
            .then((res) => {
                handleResponse(res)
            })
            .catch((err) => ErrorHandler(err.message))
    }

    const handleResponse = (res: any) => {
        const data = res.data

        if (data.length === 0) setNoProducts(true)
        else setNoProducts(false)
        setData(data)
    }

    return (
        <Public>
            {wrapperSize === '90%' ? (
                <Box p="6">
                    <form onSubmit={(ev) => handleNewSearch(ev)}>
                        <InputGroup>
                            <Input
                                placeholder="Search"
                                value={searchValue}
                                onChange={(ev) =>
                                    core.state.searchValue.set(ev.target.value)
                                }
                            />
                            <InputRightElement>
                                <Icon
                                    as={MagnifyingGlass}
                                    weight="bold"
                                    fontSize="2xl"
                                    cursor="pointer"
                                    zIndex="999"
                                    onClick={handleSearch}
                                />
                            </InputRightElement>
                        </InputGroup>
                    </form>
                </Box>
            ) : (
                <></>
            )}

            <Box
                w={wrapperSize}
                m="0 auto"
                mt={wrapperSize !== '90%' ? '50px' : ''}
            >
                {!noProducts ? (
                    <>
                        <Heading>Search result for: {search_value}</Heading>
                        {data.length > 0 ? (
                            <Grid
                                templateColumns={
                                    wrapperSize === '90%'
                                        ? 'repeat(2, 1fr)'
                                        : wrapperSize === '2xl'
                                        ? 'repeat(3, 1fr)'
                                        : 'repeat(4, 1fr)'
                                }
                                gridGap="2"
                                mt="8"
                            >
                                <>
                                    {data.map((row: any, i: number) => (
                                        <ProductCard {...row.item} key={i} />
                                    ))}
                                </>
                            </Grid>
                        ) : (
                            <Loader />
                        )}
                    </>
                ) : (
                    <Heading textAlign="center">No products found</Heading>
                )}
            </Box>
        </Public>
    )
}

export default Search
