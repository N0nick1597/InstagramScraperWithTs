import { Connection, DatabaseType, createConnections } from 'typeorm';
import path from 'path';

const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST, MYSQL_PORT, MYSQL_NAME } = process.env;

const mysqlConnectionType: DatabaseType = 'mysql';
const mysqlConnectionParams = {
  name: MYSQL_NAME,
  type: mysqlConnectionType,
  entities: [path.join(__dirname, '../../Modules/**/*.entity.ts')],
  host: MYSQL_HOST,
  port: parseInt(MYSQL_PORT!, 10),
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  synchronize: true,
  logging: false,
};

export const createDatabaseConnection = (): Promise<Connection[]> => createConnections([mysqlConnectionParams]);
