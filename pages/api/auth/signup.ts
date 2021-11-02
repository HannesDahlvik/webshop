import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Model
import User from '../../../src/models/user'

// Utils
import dbConnect from '../../../src/middleware/database'
import bcrypt from 'bcryptjs'
import apiOptions from '../../../src/utils/apiOptions'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>(apiOptions).post(
    (req, res) => {
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
                    if (err) res.json({ error: err.message })

                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err)
                            return res.json({ error: 'There was an error!' })

                        newUser.password = hash
                        newUser
                            .save()
                            .then((user) => res.json(user))
                            .catch((err) => res.json({ error: err.message }))
                    })
                })
            }
        })
    }
)

export default handler
