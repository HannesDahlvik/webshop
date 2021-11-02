import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import Products from '../../../src/models/products'

// Utils
import logger from '../../../src/utils/logger'
import dbConnect from '../../../src/middleware/database'
import apiOptions from '../../../src/utils/apiOptions'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>(apiOptions).post(
    (req, res) => {
        const { name, description, price, image, fields } = req.body

        const url = name.replace(/\s+/g, '-').toLowerCase()

        new Products({
            name,
            url,
            description,
            price,
            image,
            fields
        })
            .save()
            .then(() => {
                res.json({
                    success: true
                })
            })
            .catch((err) => {
                res.json({
                    success: false,
                    err
                })
                logger('error', err.message)
            })
    }
)

export default handler
