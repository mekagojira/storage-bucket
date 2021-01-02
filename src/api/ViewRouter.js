import Router from '../lib/RouterProtoype'
import File from '../models/file.model'
import config from '../config'
import * as fs from 'fs'

export default class ViewRouter extends Router {
    init() {
        const { router } = this

        router.get('/view/*', async (req, res) => {
            const reqUrl = req.url.replace('/view', '')
            const _id = reqUrl.split('_').pop().split('.')[0]

            const file = await File.findOne({ _id })

            if (!file) return res.status(404).send('File invalid')

            const { token } = req.query

            const { url: fileUrl, isPublic, name, ext } = file
            if (!isPublic && !token) return res.status(404).send('File invalid')

            const filePath = `${config.storagePath}${fileUrl}`

            res.header(
                'Content-Disposition',
                `attachment; filename="${name}.${ext}"`
            )

            return fs.createReadStream(filePath).pipe(res)
        })
    }
}
