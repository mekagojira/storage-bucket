import code from '../code'
import createError from '../helpers/createError'

export default class ActionPrototype {
    constructor() {
        this.createError = createError
        this.code = code
    }
}
