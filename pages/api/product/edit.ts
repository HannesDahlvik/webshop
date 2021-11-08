import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import Products from '../../../src/models/products'

// Utils
import logger from '../../../src/utils/logger'
import dbConnect from '../../../src/utils/database'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
    const { name, description, price, _id } = req.body

    await Products.updateOne(
        {
            _id: _id
        },
        {
            name,
            description,
            price
        }
    )
        .then(() => {
            res.send({ message: 'Updated product' })
        })
        .catch((err) => {
            res.send({ error: 'There was an error' })
            logger('error', err.message)
        })
})

export default handler
