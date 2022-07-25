import getEntityManager from '../../kernel/db'

export default function UserRepository() {
    return Object.freeze({
        findByUsername: async ({username}) => {
            const em = await getEntityManager()
            const result = await em.query('SELECT id, name, role, username, email, password FROM user WHERE username = ?', username)
            console.log(result);
            if (result.length === 0) {
                return null
            }
            const {id, ...userInfo} = result[0]
            return {id, ...userInfo}
        },
        findByEmail: async ({email}) => {
            const em = await getEntityManager()
            const result = await em.query('SELECT id, name, role, username, email, password FROM user WHERE email = ?', email)
            console.log(result);
            if (result.length === 0) {
                return null
            }
            const {id, ...userInfo} = result[0]
            return {id, ...userInfo}
        },
        insert: async ({...userInfo}) => {
            const em = await getEntityManager()
            const result = await em
                .query('INSERT INTO user SET ?', userInfo);
            console.log(result);
            const {...insertedInfo} = userInfo
            return {id: result.insertId, ...insertedInfo}
        },
    })
}
