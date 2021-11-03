import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import Products from '../../src/models/products'

// Utils
import logger from '../../src/utils/logger'
import dbConnect from '../../src/middleware/database'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>().get((req, res) => {
    Products.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send({ error: 'There was an error' })
            logger('error', err.message)
        })
})

export default handler
