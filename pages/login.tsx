import React, { FormEvent, useEffect, useState } from 'react'

// Routing
import { useRouter } from 'next/router'

// Layout
import Public from '../src/layouts/Public'

// UI
import {
    Box,
    Input,
    Button,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    InputRightElement,
    InputGroup
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

// utils
import auth from '../src/services/auth'
import jwtDecode from 'jwt-decode'
import fetcher from '../src/utils/fetcher'
import useInfoHandler from '../src/utils/useInfoHandler'
import useErrorHandler from '../src/utils/useErrorHandler'

const Login: React.FC = () => {
    const InfoHandler = useInfoHandler()
    const ErrorHandler = useErrorHandler()

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (email.length > 2 && password.length > 5) setDisabled(false)
        else setDisabled(true)
    }, [email, password])

    const handleLogin = (ev: FormEvent) => {
        ev.preventDefault()

        if (!disabled)
            fetcher('/api/auth/login', 'POST', {
                email,
                password
            })
                .then((res) => {
                    const data = res.data

                    if (data.error) {
                        ErrorHandler(data.error)
                    } else {
                        auth.setToken(data.token)
                        auth.setUser(jwtDecode(data.token))
                        InfoHandler('Successfully logged in!')
                        router.push('/')
                    }
                })
                .catch((err) =>
                    ErrorHandler('There was an error with login!', err)
                )
    }

    return (
        <Public>
            <Flex justify="center" align="center" pt="7em" textAlign="center">
                <Box maxW="400px" w="100%">
                    <Heading fontSize="5xl" mb="8">
                        Login
                    </Heading>

                    <form onSubmit={handleLogin}>
                        <FormControl isRequired my="4">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired my="4">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    pr="4.5rem"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(ev) =>
                                        setPassword(ev.target.value)
                                    }
                                />
                                <InputRightElement width="3rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button
                            isFullWidth
                            colorScheme="primary"
                            isDisabled={disabled}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </form>
                </Box>
            </Flex>
        </Public>
    )
}

export default Login
