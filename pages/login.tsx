import React, { useState } from 'react'

// Routing
import { useRouter } from 'next/router'

// Layout
import Public from '../src/frontend/layouts/Public'

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
import auth from '../src/frontend/services/auth'
import jwtDecode from 'jwt-decode'
import fetcher from '../src/frontend/utils/fetcher'
import useInfoHandler from '../src/frontend/utils/useInfoHandler'
import useErrorHandler from '../src/frontend/utils/useErrorHandler'

const Login: React.FC = () => {
    const InfoHandler = useInfoHandler()
    const ErrorHandler = useErrorHandler()

    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (ev: React.FormEvent) => {
        ev.preventDefault()

        if (email !== '' && password !== '') {
            fetcher('/api/auth/login', 'POST', {
                email,
                password
            })
                .then((res) => {
                    if (res.data.error) {
                        ErrorHandler(res.data.error)
                    } else {
                        auth.setToken(res.data.token)
                        auth.setUser(jwtDecode(res.data.token))
                        InfoHandler('Successfully logged in!')
                        router.push('/')
                    }
                })
                .catch((err) => ErrorHandler('There was an error with login!'))
        }
    }

    return (
        <Public>
            <Flex justify="center" align="center" pt="50px" textAlign="center">
                <Box maxW="375px" w="100%">
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
