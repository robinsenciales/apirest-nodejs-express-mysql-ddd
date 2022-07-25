import {config} from 'dotenv';

config();

export default {
    host: process.env.HOST || '',
    database: process.env.DATABASE || '',
    user: process.env.USER || '',
    password: process.env.PASSWORD || '',
    jwt_secret: process.env.JWT_SECRET || '',
    jwt_expires_in: process.env.JWT_EXPIRES_IN || '',
}
