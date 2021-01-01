import jwt from 'jsonwebtoken'
import config from '../config'

export const signJwt = data => jwt.sign(data, config.jwtKey)

export const verifyJwt = data => jwt.verify(data, config.jwtKey)
