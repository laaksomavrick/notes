import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from '../config';

export const dbConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: config.get('database.host'),
    port: config.get('database.port'),
    username: config.get('database.username'),
    password: config.get('database.password'),
    database: config.get('database.schema'),
    entities: ['src/**/**.entity{.ts,.js}'],
    synchronize: config.get('database.synchronize')
};

export const DatabaseModule = TypeOrmModule.forRoot(dbConfig);
