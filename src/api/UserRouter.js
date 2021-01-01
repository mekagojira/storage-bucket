import Router from '../lib/RouterProtoype'
import Login from '../actions/users/login/Login'

export default class UserRouter extends Router {
    init() {
        const { router } = this

        router.get('/users', (req, res) => res.json({ a: 1 }))

        router.post('/login', this.handle(Login))
    }
}
