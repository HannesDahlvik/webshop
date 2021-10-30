import { useToast } from '@chakra-ui/toast'

const useErrorHandler = () => {
    const toast = useToast()

    const showError = (msg: string) => {
        toast({
            title: msg,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom-left'
        })
    }
    return showError
}

export default useErrorHandler
