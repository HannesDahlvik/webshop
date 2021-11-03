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
import { Box, Grid, Heading } from '@chakra-ui/react'

// Components
import ProductCard from '../../src/components/public/ProductCard'
import Loader from '../../src/components/Loader'

// Utils
import fetcher from '../../src/utils/fetcher'
import useErrorHandler from '../../src/utils/useErrorHandler'
import Fuse from 'fuse.js'

const Search: React.FC = () => {
    const ErrorHandler = useErrorHandler()

    const wrapperSize = usePulse(core.state.wrapperSize)

    const router = useRouter()
    const { search_value } = router.query

    const [data, setData] = useState<ProductsDocument[]>([])
    const [noProducts, setNoProducts] = useState(false)

    useEffect(() => {
        handleSearch()
    }, [router.asPath])

    const handleSearch = () => {
        fetcher('/api/search', 'GET')
            .then((res) => {
                const fuse: any = new Fuse(res.data, {
                    keys: ['name', 'description']
                }).search(search_value as string)

                if (fuse.length === 0) setNoProducts(true)
                else setNoProducts(false)
                setData(fuse)
            })
            .catch((err) => ErrorHandler(err.message))
    }

    return (
        <Public>
            <Box w={wrapperSize} m="50px auto">
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
