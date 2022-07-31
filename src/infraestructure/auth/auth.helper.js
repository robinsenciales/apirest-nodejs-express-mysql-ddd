import * as bcrypt from 'bcryptjs'

export default function AuthHelper() {
    return Object.freeze({
        encrypt: async (textPlain) => {
            console.log('textPlain ', textPlain)
            return await bcrypt.hash(textPlain, 10)
        },
        compare: async (passwordPlain, hashPassword) => {
            return await bcrypt.compare(passwordPlain, hashPassword)
        }
    })
}
