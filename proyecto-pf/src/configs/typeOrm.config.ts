import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from "dotenv";
import { registerAs } from "@nestjs/config";
import * as path from 'path';

dotenvConfig({ path: ".env"}); 
const algo = 12

const config = {
    type: 'postgres',
    database: process.env.DB_database,
    // host: 'postgresdb',
    host:process.env.DB_host,
    port: parseInt(process.env.DB_port, 10),
    username: process.env.DB_username,
    password: process.env.DB_password,
    synchronize: true,
    logging: false,
    dropSchema: false,  
    autoLoadEntities: false,
    entities: [path.join(__dirname, '../../dist/**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '../../dist/migrations/*{.js,.ts}')],
};

export default registerAs("typeorm", () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
