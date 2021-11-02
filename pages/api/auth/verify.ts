import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import User from '../../../src/models/user'
import { UserDoc } from '../../../src/models/user'

// Utils
import dbConnect from '../../../src/middleware/database'
import config from '../../../src/config/config'
import jwt from 'jsonwebtoken'
import apiOptions from '../../../src/utils/apiOptions'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>(apiOptions).get(
    (req, res) => {
        let token: any = req.headers.authentication
        token = token.replace('Bearer ', '')

        if (token) {
            jwt.verify(
                token,
                config.jwtSecret,
                (err: any, decoded: UserDoc) => {
                    if (err) {
                        res.json({ error: 'Unauthorized: Invalid token' })
                    } else {
                        const user = decoded

                        User.findOne({ email: user.email })
                            .then((user) => {
                                if (user) {
                                    res.json({
                                        _id: user._id,
                                        role: user.role,
                                        firstname: user.firstname,
                                        lastname: user.lastname,
                                        email: user.email,
                                        address: user.address,
                                        phone: user.phone
                                    })
                                }
                            })
                            .catch((err) =>
                                res.json({ error: 'There was an error!' })
                            )
                    }
                }
            )
        } else {
            res.json({ error: 'Unauthorized: no token provided!' })
        }
    }
)

export default handler
