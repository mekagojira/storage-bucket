import dotenv from 'dotenv'

const isDev =
    process.env.NODE_ENV !== 'prod' && process.env.NODE_END !== 'production'

dotenv.config({
    path: isDev ? '.env.dev' : '.env.prod',
})

const config = {
    isDev,
    jwtKey: process.env.JWT_KEY,
    port: process.env.PORT,
    bodyLimit: process.env.BODY_LIMIT || '100kb',
    corsHeaders: ['*'],
    mongoUri: process.env.MONGO_URI,
}

export default config
