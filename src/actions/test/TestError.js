import ActionPrototype from '../../lib/ActionPrototype'

export default class TestError extends ActionPrototype {
    process = async () => {
        this.createError({
            message: 'Test error',
            code: this.code.ERROR,
        })
    }
}
