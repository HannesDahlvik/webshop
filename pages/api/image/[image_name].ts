import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import fse from 'fs-extra'

const handler = nc<NextApiRequest, NextApiResponse>().get((req, res) => {
    const { image_name } = req.query

    const file = process.cwd() + '/public/images/' + image_name
    const stat = fse.statSync(file)

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size
    })

    const stream = fse.createReadStream(file)
    stream.pipe(res)
})

export default handler
