import { model, Schema } from 'mongoose'

export default function createModel(schema, name) {
    const _Schema = new Schema(schema)

    return model(name, _Schema, name)
}
