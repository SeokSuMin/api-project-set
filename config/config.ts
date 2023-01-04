import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
  username: string;
  password: string;
  database: string;
  host: string;
  [key: string]: string;
}

interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}

const config: IConfigGroup = {
  development: {
    username: 'postgres',
    password: '112234',
    database: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
    timezone: '+09:00',
  },
  test: {
    username: 'root',
    password: '',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'postgres',
    password: String(process.env.DB_PASSWORD),
    database: 'postgres',
    host: String(process.env.DB_HOST),
    dialect: 'postgres',
    timezone: '+09:00',
  },
};

export default config;
