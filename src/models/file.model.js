import * as mongoose from 'mongoose'
import modelNames from './_modelsNames'
import createModel from './_createModel'

const FileSchema = {
    url: String,
    name: String,
    description: String,
    type: String,
    ext: String,
    mimetype: String,
    isPublic: Boolean,
    size: Number,
    encoding: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelNames.user,
    },
}

const File = createModel(FileSchema, modelNames.file)

export default File
