import ActionPrototype from '../../../lib/ActionPrototype'
import * as fs from 'fs'
import File from '../../../models/file.model'

export default class SingleUpload extends ActionPrototype {
    parseFile = file => {
        if (!file) throw 'Invalid file'

        const { originalname, path } = file

        if (!path || !originalname) throw 'Invalid file'

        const splitName = (originalname + '').split('.')
        const type = splitName.pop()
        const filename = splitName.join('.')

        return { ...file, filename, type }
    }

    parseInfo = args => {
        const { name, description, isPublic } = args

        return {
            name: name ? (name + '').trim() : '',
            description: description ? description + '' : '',
            isPublic: !!isPublic,
        }
    }

    parseArgs = req => {
        const { file, body } = req

        return {
            file: this.parseFile(file),
            data: this.parseInfo(body),
        }
    }

    convertTo2Digit = number => (number < 10 ? `0${number}` : number + '')

    createDir = async () => {
        const date = new Date()
        const year = date.getFullYear()
        const month = this.convertTo2Digit(date.getMonth() + 1)
        const day = this.convertTo2Digit(date.getDate())
        const relativePath = `/${year}/${month}/${day}`
        const absolutePath = `${this.config.storagePath}${relativePath}`
        await fs.promises.mkdir(absolutePath, { recursive: true })

        return { absolutePath, relativePath }
    }

    copyFile = async ({ path: originalPath }, fileName, destPath) => {
        const originalFile = originalPath
        const destFile = `${destPath}/${fileName}`

        await fs.promises.copyFile(originalFile, destFile)

        return destFile
    }

    saveFile = async (file, args, { _id: userId }) => {
        const name = `${args.name || file.filename}_${new Date().getTime()}.${
            file.type
        }`
        const { absolutePath, relativePath } = await this.createDir()

        await this.copyFile(file, name, absolutePath)

        const fileData = {
            url: `${relativePath}/${name}`,
            name: args.name || file.filename,
            ext: file.type,
            type: file.mimetype.split('/')[0],
            description: args.description,
            mimetype: file.mimetype,
            encoding: file.encoding,
            size: file.size,
            isPublic: args.isPublic,
            user: userId,
        }

        const newFile = new File(fileData)

        const entity = await newFile.save()
        return entity.toJSON()
    }

    process = async req => {
        const { file, data } = this.parseArgs(req)

        return this.saveFile(file, data, req.user)
    }
}
