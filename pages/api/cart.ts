import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../src/middleware/database'

// Model
import Products from '../../src/models/products'

dbConnect()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default handler
