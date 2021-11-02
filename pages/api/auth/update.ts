import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import User from '../../../src/models/user'

// Utils
import dbConnect from '../../../src/middleware/database'
import logger from '../../../src/utils/logger'
import apiOptions from '../../../src/utils/apiOptions'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>(apiOptions).post(
    (req, res) => {
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
                        .catch((err) =>
                            res.json({ error: 'There was an error!' })
                        )
                }
            })
            .catch((err) => {
                logger('error', err.message)
                res.json({
                    error: err.message
                })
            })
    }
)

export default handler
