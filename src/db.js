import mongoose from 'mongoose'
import config from './config'

export default callback => {
    mongoose.connect(config.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    if (config.isDev) mongoose.set('debug', true)

    const db = mongoose.connection

    db.on('error', err => {
        console.error('connection error:')
        console.error(err)
    })

    db.once('open', () => {
        console.log('DB connected')
        console.log(config.mongoUri)
        callback()
    })
}
