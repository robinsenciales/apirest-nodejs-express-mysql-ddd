import * as jwt from 'jsonwebtoken'
import config from "../../kernel/config";

export default function AuthUtil() {
    return Object.freeze({
        generateToken: async (user) => {
            console.log('user ', user)
            return jwt.sign({
                    name: user.name,
                    username: user.username,
                    role: user.role,
                },
                config.jwt_secret,
                {expiresIn: config.jwt_expires_in}
            )
        },
        verifyToken: async (token) => {
            return jwt.verify(token, config.jwt_secret)
        }
    })
}
