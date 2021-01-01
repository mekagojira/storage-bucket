import Router from '../lib/RouterProtoype'
import multer from 'multer'
import SingleUpload from '../actions/upload/singleUpload/SingleUpload'
import Auth from '../middleware/Auth'

const upload = multer({ dest: 'uploads/' })

export default class UploadRouter extends Router {
    init() {
        const router = this.getRouter()

        router.post(
            '/upload/single',
            upload.single('file'),
            this.handle(Auth, true),
            this.handle(SingleUpload)
        )
    }
}
