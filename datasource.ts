import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();
console.log(process.env);

export default new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false,
    entities: ['./dist/src/entities/*.entity.js'],
    migrations: ['./dist/src/migrations/*.js'],
});