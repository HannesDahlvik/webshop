import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../src/backend/middleware/database'

// Model
import products from '../../../src/backend/models/products'

// Utils
import logger from '../../../src/backend/utils/logger'

dbConnect()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.query

    products
        .findOne({
            url: name
        })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => logger('error', err.message))
}

export default handler
