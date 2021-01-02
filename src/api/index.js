import { version } from '../../package.json'
import { Router } from 'express'
import UserRouter from './UserRouter'
import UploadRouter from './UploadRouter'

export default ({ config, db }) => {
    let api = Router()

    const userRouter = new UserRouter()
    api.use(userRouter.getRouter())

    const uploadRouter = new UploadRouter()
    api.use(uploadRouter.getRouter())

    // perhaps expose some API metadata at the root
    api.all((req, res) => {
        res.json({ version })
    })

    return api
}
