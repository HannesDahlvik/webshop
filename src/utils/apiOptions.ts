import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import logger from './logger'

const apiOptions = {
    onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
        logger('error', err)
        res.status(500).end('Broke')
    }
}

export default apiOptions
