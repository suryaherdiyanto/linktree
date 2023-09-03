import { DataSource } from "typeorm";

export default new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "linktree",
    entities: ['./src/entities/*.entity.ts'],
    migrations: ['./src/migrations/*.ts'],
});