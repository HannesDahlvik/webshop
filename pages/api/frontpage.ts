import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../src/backend/middleware/database'

// Model
import Products from '../../src/backend/models/products'

// Utils
import logger from '../../src/backend/utils/logger'

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
