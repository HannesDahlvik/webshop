import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import Products from '../../../src/models/products'

// Utils
import logger from '../../../src/utils/logger'
import dbConnect from '../../../src/utils/database'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>().post((req, res) => {
    const { ids } = req.body

    Products.deleteMany({
        _id: ids
    })
        .then(() => {
            res.send({ message: 'Removed product' })
        })
        .catch((err) => {
            res.send({ error: 'There was an error' })
            logger('error', err.message)
        })
})

export default handler
