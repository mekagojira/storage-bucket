import code from '../code'
import createError from '../helpers/createError'
import config from '../config'

export default class ActionPrototype {
    constructor() {
        this.createError = createError
        this.code = code
        this.config = config
    }
}
