import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import fse from 'fs-extra'
import path from 'path'
import logger from '../../../src/utils/logger'

const handler = nc<NextApiRequest, NextApiResponse>().post((req, res) => {
    const images = req.body.files

    console.log(images)

    images.map((row) => {
        const filePath = path.resolve(`./public/images/${row}`)

        fse.remove(filePath, (err) => {
            if (err) {
                logger('error', err)
                return res.send({
                    success: false,
                    err: 'There was an error removing image(s).'
                })
            }

            res.send({ success: true, message: 'Removed image' })
        })
    })
})

export default handler
