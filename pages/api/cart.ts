import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import Products from '../../src/models/products'

// Utils
import dbConnect from '../../src/middleware/database'
import apiOptions from '../../src/utils/apiOptions'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>(apiOptions).get(
    async (req, res) => {
        if (req.body.ids) {
            await Products.find({
                _id: { $in: req.body.ids }
            })
                .then((products) => {
                    if (products.length > 0) {
                        res.json(products)
                    } else {
                        res.send(false)
                    }
                })
                .catch((err) => res.json({ error: 'There was an error' }))
        } else res.json({ error: 'There was an error' })
    }
)

export default handler
