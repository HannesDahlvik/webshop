import React from 'react'

// Logic
import core from '../../src/logic/core'
import { usePulse } from '@pulsejs/react'

// Routing
import { useRouter } from 'next/router'

// Layout
import Public from '../../src/layouts/Public'

// UI
import {
    Flex,
    Heading,
    InputGroup,
    Input,
    InputRightElement,
    Icon,
    Box
} from '@chakra-ui/react'
import { MagnifyingGlass } from 'phosphor-react'

// Utils
import useInfoHandler from '../../src/utils/useInfoHandler'

const SearchIndex: React.FC = () => {
    const InfoHandler = useInfoHandler()

    const wrapperSize = usePulse(core.state.wrapperSize)
    const searchValue = usePulse(core.state.searchValue)

    const router = useRouter()

    const handleSearch = (ev: React.FormEvent) => {
        ev.preventDefault()
        if (searchValue.length > 2) {
            router.push(`/search/${searchValue}`)
        } else if (searchValue.length === 0) {
            InfoHandler('Enter a search value!')
        } else if (searchValue.length < 3) {
            InfoHandler('Has to be more than 3 characters')
        } else {
            InfoHandler('Enter a search value!')
        }
    }

    return (
        <Public>
            <Flex flexDir="column" w={wrapperSize} m="0 auto" pt="12">
                <Heading textAlign="center" mb="4">
                    Search
                </Heading>

                <Box as="form" textAlign="center" onSubmit={handleSearch}>
                    <InputGroup
                        w={wrapperSize === '90%' ? '90%' : '50%'}
                        m="0 auto"
                    >
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
                </Box>
            </Flex>
        </Public>
    )
}

export default SearchIndex
