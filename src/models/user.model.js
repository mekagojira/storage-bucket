import createModel from './_createModel'
import modelNames from './_modelsNames'

const User = createModel(
    {
        username: String,
        password: String,
        name: String,
        avatar: String,
        status: {
            type: String,
            enum: ['active', 'inactive', 'deleted'],
        },
        type: {
            type: String,
            enum: ['admin', 'user'],
        },
    },
    modelNames.user
)

export default User
