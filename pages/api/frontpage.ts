import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../src/middleware/database'

// Model
import Products from '../../src/models/products'

// Utils
import logger from '../../src/utils/logger'

dbConnect()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await Products.find()
        .limit(8)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send({ error: 'There was and error' })
            logger('error', err.message)
        })
}

export default handler
