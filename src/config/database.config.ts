import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export let databaseOption: TypeOrmModuleOptions;

switch (process.env.NODE_ENV) {
    case 'dev':
        databaseOption = {
            type: 'mysql',
            synchronize: true,
            database: process.env.DB_DATABASE,
            autoLoadEntities: true,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: 3306
        }
        break;

    case 'production':
        databaseOption = {
            type: 'mysql',
            synchronize: true,
            database: process.env.DB_DATABASE,
            autoLoadEntities: true,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: 3306,
            ssl: {
                rejectUnauthorized: true
            }
        }
        break;
    default:
        databaseOption = {
            type: 'sqlite',
            synchronize: true,
            database: ':memory:',
            autoLoadEntities: true
        }
        break;
}
