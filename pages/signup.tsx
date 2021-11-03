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
    InputGroup,
    Divider
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

// utils
import auth from '../src/services/auth'
import jwtDecode from 'jwt-decode'
import fetcher from '../src/utils/fetcher'
import useInfoHandler from '../src/utils/useInfoHandler'
import useErrorHandler from '../src/utils/useErrorHandler'

const Signup: React.FC = () => {
    const InfoHandler = useInfoHandler()
    const ErrorHandler = useErrorHandler()

    const router = useRouter()

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (
            firstname.length > 2 &&
            lastname.length > 2 &&
            email.length > 2 &&
            password.length > 5 &&
            phone.length > 2 &&
            address.length > 2
        )
            setDisabled(false)
        else setDisabled(true)
    }, [firstname, lastname, email, password, phone, address])

    const handleSignup = (ev: FormEvent) => {
        ev.preventDefault()

        if (!disabled)
            fetcher('/api/auth/signup', 'POST', {
                firstname,
                lastname,
                email,
                password,
                phone,
                address
            })
                .then((res) => {
                    const data = res.data

                    if (data.error) {
                        ErrorHandler(data.error)
                    } else {
                        auth.setToken(data.token)
                        auth.setUser(jwtDecode(data.token))
                        InfoHandler('Successfully signed up!')
                        router.push('/')
                    }
                })
                .catch((err) =>
                    ErrorHandler('There was an error with signup', err)
                )
    }

    return (
        <Public>
            <Flex justify="center" align="center" pt="7em" textAlign="center">
                <Box maxW="400px" w="100%">
                    <Heading fontSize="5xl" mb="8">
                        Signup
                    </Heading>

                    <form onSubmit={handleSignup}>
                        <Flex mb="4">
                            <FormControl isRequired>
                                <FormLabel>Firstname</FormLabel>
                                <Input
                                    type="text"
                                    value={firstname}
                                    onChange={(ev) =>
                                        setFirstname(ev.target.value)
                                    }
                                />
                            </FormControl>

                            <FormControl ml="4" isRequired>
                                <FormLabel>Lastname</FormLabel>
                                <Input
                                    type="text"
                                    value={lastname}
                                    onChange={(ev) =>
                                        setLastname(ev.target.value)
                                    }
                                />
                            </FormControl>
                        </Flex>

                        <FormControl isRequired mb="4">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired mb="4">
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

                        <Divider mt="8" mb="6" />

                        <FormControl isRequired mb="4">
                            <FormLabel>Phone</FormLabel>
                            <Input
                                type="tel"
                                value={phone}
                                onChange={(ev) => setPhone(ev.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired mb="4">
                            <FormLabel>Address</FormLabel>
                            <Input
                                type="text"
                                value={address}
                                onChange={(ev) => setAddress(ev.target.value)}
                            />
                        </FormControl>

                        <Button
                            isFullWidth
                            colorScheme="primary"
                            isDisabled={disabled}
                            onClick={handleSignup}
                        >
                            Signup
                        </Button>
                    </form>
                </Box>
            </Flex>
        </Public>
    )
}

export default Signup
