import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import Products from '../../src/models/products'

// Utils
import logger from '../../src/utils/logger'
import dbConnect from '../../src/middleware/database'
import apiOptions from '../../src/utils/apiOptions'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>(apiOptions).get(
    (req, res) => {
        Products.find()
            .limit(8)
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.send({ error: 'There was an error' })
                logger('error', err.message)
            })
    }
)

export default handler
