import { useToast } from '@chakra-ui/toast'

const useErrorHandler = () => {
    const toast = useToast()

    const showError = (msg: string, err?: any) => {
        if (err) console.error(err)

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
