import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../src/middleware/database'

// Model
import Products from '../../../src/models/products'

// Utils
import logger from '../../../src/utils/logger'

dbConnect()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { product_name } = req.query

    Products.findOne({
        url: product_name
    })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => logger('error', err.message))
}

export default handler
