import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import multer from 'multer'
import path from 'path'
import logger from '../../../src/utils/logger'
import createRandomString from '../../../src/utils/createRandomString'

interface CustomReqest extends NextApiRequest {
    files: FileList[]
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./public/images'))
    },
    filename: (req, file, cb) => {
        cb(null, `${createRandomString(20)}-${Date.now()}.png`)
    }
})
const upload = multer({ storage: storage }).any()

const handler = nc<any, any>().post((req, res) => {
    upload(req, res, (err) => {
        if (err) {
            logger('error', err)
            console.error(err)

            res.status(500).send({
                success: false,
                message: 'There was an error!'
            })
        } else
            res.send({
                success: true,
                message: 'Uploaded image',
                files: req.files
            })
    })
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler
