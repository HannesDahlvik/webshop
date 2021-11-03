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
    User.findOne({
        email: req.body.email
    }).then((user) => {
        const { firstname, lastname, email, address, phone, password } =
            req.body

        if (user) {
            return res.json({ error: 'User already exists!' })
        } else {
            const newUser = new User({
                firstname,
                lastname,
                email,
                address,
                phone,
                password
            })

            bcrypt.genSalt(10, (err, salt) => {
                if (err) return res.json({ error: err.message })

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) return res.json({ error: 'There was an error!' })

                    newUser.password = hash
                    newUser
                        .save()
                        .then((user) => {
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
                                    if (err)
                                        res.json({
                                            error: 'There was an error!'
                                        })

                                    res.json({ token })
                                }
                            )
                        })
                        .catch((err) => res.json({ error: err.message }))
                })
            })
        }
    })
})

export default handler
