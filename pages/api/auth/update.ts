import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import User from '../../../src/models/user'

// Utils
import dbConnect from '../../../src/utils/database'
import logger from '../../../src/utils/logger'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>().post((req, res) => {
    const { _id, firstname, lastname, address, phone } = req.body

    User.findByIdAndUpdate(_id, {
        firstname,
        lastname,
        address,
        phone
    })
        .then((result) => {
            if (result) {
                User.findById(_id)
                    .then((user) => {
                        res.json(user)
                    })
                    .catch((err) => res.json({ error: 'There was an error!' }))
            }
        })
        .catch((err) => {
            logger('error', err.message)
            res.json({
                error: err.message
            })
        })
})

export default handler
