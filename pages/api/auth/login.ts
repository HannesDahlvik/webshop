import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../src/backend/middleware/database'
import config from '../../../src/backend/config/config'

// Model
import User from '../../../src/backend/models/user'

// Utils
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

dbConnect()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body

    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.json({ error: 'Email not found!' })
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    role: user.role,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    address: user.address,
                    phone: user.phone
                }

                jwt.sign(
                    payload,
                    config.jwtSecret,
                    {
                        expiresIn: 2592000
                    },
                    (err, token) => {
                        if (err) {
                            res.json({
                                error: 'There was an error!'
                            })
                        }

                        res.json({
                            success: true,
                            token
                        })
                    }
                )
            } else {
                return res.json({ error: 'Password incorrect!' })
            }
        })
    })
}

export default handler
