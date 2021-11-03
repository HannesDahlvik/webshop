import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import User from '../../../src/models/user'

// Utils
import dbConnect from '../../../src/middleware/database'
import config from '../../../src/config/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>().post((req, res) => {
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
})

export default handler
