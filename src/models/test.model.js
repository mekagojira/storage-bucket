import createModel from './_createModel'
import modelNames from './_modelsNames'

const TestSchema = { name: String }

const Test = createModel(TestSchema, modelNames.test)

export default Test
