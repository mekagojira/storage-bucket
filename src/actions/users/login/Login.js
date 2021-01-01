import ActionPrototype from '../../../lib/ActionPrototype'
import User from '../../../models/user.model'
import md5 from 'md5'
import { signJwt } from '../../../helpers/jwt'

export default class Login extends ActionPrototype {
    parseArgs = args => {
        const { username, password } = args

        if (!username) throw new Error('Invalid username')
        if (!password) throw new Error('Invalid password')

        return {
            username: (username + '').trim(),
            password: password + '',
        }
    }

    login = async ({ username, password }) => {
        const where = { username, status: 'active' }

        const user = await User.findOne(where).lean()

        if (!user) throw 'User not exist'

        const { password: savedPassword, ...signedData } = user

        const hashedInputPassword = md5(password)
        if (savedPassword !== hashedInputPassword) throw 'Invalid password'

        const token = await signJwt(signedData)

        return { token, user: signedData }
    }

    process = async req => {
        const args = this.parseArgs(req.body)

        return this.login(args)
    }
}
