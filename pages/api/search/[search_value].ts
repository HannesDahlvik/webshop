import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import Products from '../../../src/models/products'

// Utils
import logger from '../../../src/utils/logger'
import dbConnect from '../../../src/utils/database'
import Fuse from 'fuse.js'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>().get((req, res) => {
    const { search_value } = req.query

    Products.find()
        .then((result) => {
            const fuse: any = new Fuse(result, {
                keys: ['name', 'description']
            }).search(search_value as string)

            res.send(fuse)
        })
        .catch((err) => {
            res.send({ error: 'There was an error' })
            logger('error', err.message)
        })
})

export default handler
