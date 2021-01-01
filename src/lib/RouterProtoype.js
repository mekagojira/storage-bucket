import { Router as R } from 'express'
import code from '../code'
import resource from 'resource-router-middleware'

const sendSuccess = res => data => {
    const response = {
        code: code.OK,
        data: data || {},
        error: null,
    }

    return res.status(200).json(response)
}

const sendError = res => error => {
    console.log(error)

    const response = {
        code: error.code || code.ERROR,
        data: null,
        error: error.message || error,
    }
    const status = error.status || 200

    return res.status(status).json(response)
}

class Router {
    constructor() {
        const router = R()
        this.router = router
        this.resource = resource
        this.init()
    }

    handle = (Action, hasNext) => (req, res, next) => {
        const actionInstance = new Action()

        actionInstance
            .process(req)
            .then(data => {
                if (!!hasNext) return next()
                sendSuccess(res)(data)
            })
            .catch(sendError(res))
    }

    getRouter = () => {
        return this.router
    }
}

export default Router
