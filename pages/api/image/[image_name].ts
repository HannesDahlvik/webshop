import { NextApiRequest, NextApiResponse } from 'next'

// Utils
import fs from 'fs'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { image_name } = req.query

    const file = process.cwd() + '/pages/api/image/' + image_name + '.png'
    const stat = fs.statSync(file)

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size
    })

    const stream = fs.createReadStream(file)
    stream.pipe(res)
}

export default handler
