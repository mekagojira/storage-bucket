import * as mongoose from 'mongoose'
import modelNames from './_modelsNames'
import createModel from './_createModel'

const FileSchema = {
    url: String,
    name: String,
    mimetype: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: modelNames.user,
    },
}

const File = createModel(FileSchema, modelNames.file)

export default File
