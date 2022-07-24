import getEntityManager from '../../kernel/db'

export default function LanguageRepository() {
    return Object.freeze({
        findAll: async ({} = {}) => {
            const em = await getEntityManager();
            const result = await em.query('SELECT id, name, programmers FROM language')
            console.log(result);
            return result;
        },
        findById: async ({id}) => {
            const em = await getEntityManager()
            const result = await em.query('SELECT id, name, programmers FROM language WHERE id = ?', id);
            console.log(result);
            if (result.length === 0) {
                return null
            }
            const {...info} = result[0]
            return {...info}
        },
        insert: async ({...languageInfo}) => {
            const em = await getEntityManager()
            const result = await em
                .query('INSERT INTO language SET ?', languageInfo);
            console.log(result);
            const {...insertedInfo} = languageInfo
            return {id: result.insertId, ...insertedInfo}
        },
        update: async ({id, ...languageInfo}) => {
            const em = await getEntityManager()
            const result = await em
                .query('UPDATE language SET ? WHERE id = ?', [languageInfo, id])
            console.log(result);
            return result.affectedRows > 0 ? {id, ...languageInfo} : null
        },
        remove: async ({id}) => {
            const em = await getEntityManager()
            const result = await em.query('DELETE FROM language WHERE id = ?', id)
            console.log(result);
            return result.deletedCount
        },
        findByName: async ({name}) => {
            const em = await getEntityManager()
            const result = await em.query('SELECT id, name, programmers FROM language WHERE name = ?', name)
            console.log(result);
            if (result.length === 0) {
                return null
            }
            const {id, ...insertedInfo} = result[0]
            return {id, ...insertedInfo}
        },
    })
}
