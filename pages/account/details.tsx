import React, { useEffect, useState } from 'react'

// Logic
import core from '../../src/frontend/logic/core'
import { usePulse } from '@pulsejs/react'

// Layout
import Account from '../../src/frontend/layouts/Account'

// UI
import {
    Flex,
    Heading,
    Box,
    FormControl,
    Input,
    FormLabel,
    HStack,
    Divider,
    Button
} from '@chakra-ui/react'

// Services
import auth from '../../src/frontend/services/auth'

// Utils
import useInfoHandler from '../../src/frontend/utils/useInfoHandler'
import useErrorHandler from '../../src/frontend/utils/useErrorHandler'

// Components
import Loader from '../../src/frontend/components/Loader'
import fetcher from '../../src/frontend/utils/fetcher'

const Details: React.FC = () => {
    const Infohandler = useInfoHandler()
    const ErrorHandler = useErrorHandler()

    const user = usePulse(core.state.user)

    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const [firstname, setFirstname] = useState(user?.firstname)
    const [lastname, setLastname] = useState(user?.lastname)
    const [phone, setPhone] = useState(user?.phone)
    const [address, setAddress] = useState(user?.address)

    useEffect(() => {
        if (user && firstname && lastname && phone && address) {
            if (firstname !== user.firstname && firstname?.length > 2)
                setDisabled(false)
            else if (lastname !== user.lastname && lastname.length > 2)
                setDisabled(false)
            else if (phone !== user.phone && phone.length > 2)
                setDisabled(false)
            else if (address !== user.address && address.length > 2)
                setDisabled(false)
            else setDisabled(true)
        }
    }, [firstname, lastname, phone, address])

    const handleSaveDetails = () => {
        setLoading(true)
        setDisabled(true)

        fetcher('/auth/update', 'POST', {
            _id: user?._id,
            firstname,
            lastname,
            phone,
            address
        })
            .then((res) => {
                if (res.data.error) {
                    ErrorHandler(res.data.error)
                    setLoading(false)
                } else {
                    setLoading(false)
                    auth.setUser(res.data)
                    Infohandler('Successfully changed data!')
                }
            })
            .catch((err) => ErrorHandler(err.message))
    }

    if (user) {
        return (
            <Account>
                <Flex direction="column">
                    <Heading>My details</Heading>

                    <Box mt="12">
                        <Heading fontSize="1xl">Personal information</Heading>

                        <Divider my="2" />

                        <Box w="500px">
                            <HStack my="4">
                                <FormControl>
                                    <FormLabel>First name</FormLabel>
                                    <Input
                                        value={firstname}
                                        onChange={(ev) =>
                                            setFirstname(ev.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Last name</FormLabel>
                                    <Input
                                        value={lastname}
                                        onChange={(ev) =>
                                            setLastname(ev.target.value)
                                        }
                                    />
                                </FormControl>
                            </HStack>

                            <FormControl my="4">
                                <FormLabel>Phone number</FormLabel>
                                <Input
                                    type="tel"
                                    value={phone}
                                    onChange={(ev) => setPhone(ev.target.value)}
                                />
                            </FormControl>

                            <FormControl my="4">
                                <FormLabel>Address</FormLabel>
                                <Input
                                    type="text"
                                    value={address}
                                    onChange={(ev) =>
                                        setAddress(ev.target.value)
                                    }
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Box mt="6">
                        <Heading fontSize="1xl">E-mail address</Heading>

                        <Divider my="2" />

                        <Box w="500px">
                            <FormControl my="4" isReadOnly>
                                <FormLabel>Email</FormLabel>
                                <Input defaultValue={user?.email} />
                            </FormControl>

                            <Button
                                px="64px"
                                colorScheme="primary"
                                mt="4"
                                disabled={disabled}
                                isLoading={loading}
                                onClick={handleSaveDetails}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Flex>
            </Account>
        )
    } else return <Loader />
}

export default Details
