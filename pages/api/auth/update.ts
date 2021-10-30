import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../src/backend/middleware/database'

// Model
import User from '../../../src/backend/models/user'

// Utils
import logger from '../../../src/backend/utils/logger'

dbConnect()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
}

export default handler
