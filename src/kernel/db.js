import mysql from "promise-mysql";
import config from "./config";

export default async function getEntityManager() {
    return mysql.createConnection({
        host: config.host,
        database: config.database,
        user: config.user,
        password: config.password,
    });
}
