import { useToast } from '@chakra-ui/toast'

const useInfoHandler = () => {
    const toast = useToast()

    const showInfo = (msg: string) => {
        toast({
            title: msg,
            status: 'info',
            duration: 5000,
            isClosable: true,
            position: 'bottom'
        })
    }
    return showInfo
}

export default useInfoHandler
