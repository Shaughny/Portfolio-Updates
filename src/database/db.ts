import { Connection, createConnection, getConnectionManager } from "typeorm";
import { User } from '../models/User';
import { Stock } from "../models/Stock";
import dotenv from "dotenv";
dotenv.config();

const db = async () => {
    const connection = await createConnection({
        type: 'mysql',
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [User,Stock]})
    return connection;
}

export default db;