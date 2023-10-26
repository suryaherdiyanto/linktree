import { DataSource } from "typeorm";

export default new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "linktree",
    entities: ['./dist/src/entities/*.entity.js'],
    migrations: ['./dist/src/migrations/*.js'],
});