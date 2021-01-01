import ActionPrototype from '../lib/ActionPrototype'
import { verifyJwt } from '../helpers/jwt'

export default class Auth extends ActionPrototype {
    process = async req => {
        const { headers } = req

        const tokenHeader =
            headers['Authorization'] || headers['authorization'] || 'Bearer '

        const token = tokenHeader.replace('Bearer ', '')

        try {
            const user = await verifyJwt(token)

            req.user = user
            req.body = {
                ...req.body,
                user,
            }
            req.query = {
                ...req.query,
                user,
            }
        } catch (e) {
            throw 'Invalid token'
        }
    }
}
