import ActionPrototype from '../../lib/ActionPrototype'
import Test from '../../models/test.model'

export default class Text extends ActionPrototype {
    process = async () => {
        const tests = await Test.find({})

        return { models: tests }
    }
}
