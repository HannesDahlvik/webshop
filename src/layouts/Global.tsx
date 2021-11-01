import React, { useEffect, useState } from 'react'
import Head from 'next/head'

// Logic
import core from '../logic/core'
import { useEvent } from '@pulsejs/react'

// Services
import auth from '../services/auth'

// Components
import Loader from '../components/Loader'

// Utils
import fetcher from '../utils/fetcher'
import useErrorHandler from '../utils/useErrorHandler'

const Global: React.FC = ({ children }) => {
    const ErrorHandler = useErrorHandler()

    const [title, setTitle] = useState('Webshop')
    const [render, setRender] = useState(false)

    useEvent(core.events.logout, () => {
        auth.logout()
    })

    useEvent(core.events.changeTitle, (payload) => {
        setTitle(payload)
    })

    useEffect(() => {
        if (localStorage.token) {
            const token = localStorage.token
            auth.setToken(token)

            if (token !== 'undefined') {
                fetcher('/api/auth/verify', 'GET')
                    .then((res) => {
                        if (res.data.error) {
                            setRender(true)
                        } else {
                            auth.setUser(res.data)
                            const currentTime = Date.now() / 1000
                            if (res.data.exp < currentTime) auth.logout()
                            setRender(true)
                        }
                    })
                    .catch((err) => {
                        ErrorHandler('There was an error')
                        setRender(true)
                    })
            } else setRender(true)
        } else setRender(true)

        let localCart: any = localStorage.getItem('cart')
        localCart = JSON.parse(localCart)
        core.state.cart.set(localCart ? localCart : [])
    }, [])

    useEffect(() => {
        checkWidth()
        watchRezise()
    }, [])

    const watchRezise = () => {
        window.addEventListener('resize', () => {
            checkWidth()
        })
    }

    const checkWidth = () => {
        if (window.innerWidth < 750) core.state.wrapperSize.set('90%')
        else if (window.innerWidth < 1000) core.state.wrapperSize.set('2xl')
        else if (window.innerWidth < 1400) core.state.wrapperSize.set('4xl')
        else core.state.wrapperSize.set('7xl')
    }

    if (!render) return <Loader />

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Webshop" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {children}
        </>
    )
}

export default Global
