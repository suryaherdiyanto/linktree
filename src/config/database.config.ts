import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export let databaseOption: TypeOrmModuleOptions;

switch (process.env.NODE_ENV) {
    case 'dev':
        databaseOption = {
            type: 'mysql',
            synchronize: true,
            database: 'linktree',
            autoLoadEntities: true,
            username: 'root',
            password: 'secret',
            host: 'localhost',
            port: 65036
        }
        break;

    case 'production':
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
