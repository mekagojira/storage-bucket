import { response } from 'express'
import responseCode from '../code'

const createError = (
    {
        message = 'Something went wrong',
        code = responseCode.ERROR,
        status = 200,
    },
    throwable = true
) => {
    const error = new Error(message)
    error.code = code
    error.status = status

    if (throwable) throw error
    return error
}

export default createError
