export default function makeLanguagesDb({makeDb}) {
    return Object.freeze({
        findAll,
        findById,
        insert,
        update,
        remove,
        findByName,
    })

    async function findAll({} = {}) {
        const db = await makeDb();
        const result = await db.query('SELECT id, name, programmers FROM language')
        console.log(result);
        return result;
    }

    async function findById({id}) {
        const db = await makeDb()
        const result = await db.query('SELECT id, name, programmers FROM language WHERE id = ?', id);
        console.log(result);
        if (result.length === 0) {
            return null
        }
        const {...info} = result[0]
        return {...info}
    }

    async function insert({...languageInfo}) {
        const db = await makeDb()
        const result = await db
            .query('INSERT INTO language SET ?', languageInfo);
        console.log(result);
        const {...insertedInfo} = languageInfo
        return {id: result['insertId'], ...insertedInfo}
    }

    async function update({id, ...languageInfo}) {
        const db = await makeDb()
        const result = await db
            .query('UPDATE language SET ? WHERE id = ?', [languageInfo, id])
        console.log(result);
        return result['affectedRows'] > 0 ? {id, ...languageInfo} : null
    }

    async function remove({id}) {
        const db = await makeDb()
        const result = await db.query('DELETE FROM language WHERE id = ?', id)
        console.log(result);
        return result.deletedCount
    }

    async function findByName({name}) {
        const db = await makeDb()
        const result = await db.query('SELECT id, name, programmers FROM language WHERE name = ?', name)
        console.log(result);
        if (result.length === 0) {
            return null
        }
        const {id, ...insertedInfo} = result[0]
        return {id, ...insertedInfo}
    }
}
