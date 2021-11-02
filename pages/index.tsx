import React, { useEffect, useState } from 'react'
import { ProductsDocument } from '../src/models/products'

// Logic
import core from '../src/logic/core'
import { usePulse } from '@pulsejs/react'

// Layout
import Public from '../src/layouts/Public'

// UI
import { Grid, Heading, Flex, Image } from '@chakra-ui/react'

// Swiper
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Components
import ProductCard from '../src/components/public/ProductCard'
import Loader from '../src/components/Loader'

// Utils
import fetcher from '../src/utils/fetcher'
import useErrorHandler from '../src/utils/useErrorHandler'

SwiperCore.use([Navigation, Pagination])

const Home: React.FC = () => {
    const wrapperSize = usePulse(core.state.wrapperSize)

    const ErrorHandler = useErrorHandler()

    const [data, setData] = useState([])
    const [noData, setNoData] = useState(false)

    useEffect(() => {
        core.events.changeTitle.emit('Webshop')

        fetcher('/api/frontpage', 'GET')
            .then((res) => {
                setData(res.data)
                if (data.length === 0) setNoData(true)
            })
            .catch((err) => {
                ErrorHandler(err.message)
                setNoData(true)
            })
    }, [])

    return (
        <Public>
            <Swiper
                loop
                autoplay
                navigation
                pagination={{
                    clickable: true
                }}
            >
                <SwiperSlide>
                    <Image
                        w="100%"
                        src="https://dummyimage.com/1600x600.png"
                        alt=""
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <Image
                        w="100%"
                        src="https://dummyimage.com/1600x600.png"
                        alt=""
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <Image
                        w="100%"
                        src="https://dummyimage.com/1600x600.png"
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>

            {data.length > 0 ? (
                <Grid
                    w={wrapperSize}
                    templateColumns={
                        wrapperSize === '90%'
                            ? 'repeat(2, 1fr)'
                            : wrapperSize === '2xl'
                            ? 'repeat(3, 1fr)'
                            : 'repeat(4, 1fr)'
                    }
                    gridGap="2"
                    m="0 auto"
                    p="32px 0"
                    mb="12"
                >
                    {data.map((row: ProductsDocument, i: number) => (
                        <ProductCard {...row} key={i} />
                    ))}
                </Grid>
            ) : noData ? (
                <Flex justify="center" align="center" pt="10">
                    <Heading>No products</Heading>
                </Flex>
            ) : (
                <Loader />
            )}
        </Public>
    )
}

export default Home
