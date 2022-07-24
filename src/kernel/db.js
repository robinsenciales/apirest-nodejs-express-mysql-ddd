import mysql from "promise-mysql";
import config from "./config";

export async function makeDb () {
    return mysql.createConnection({
        host: config.host,
        database: config.database,
        user: config.user,
        password: config.password,
    });
}
