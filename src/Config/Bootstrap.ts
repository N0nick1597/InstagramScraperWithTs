import { cleanEnv, str, port } from 'envalid';

export const validateEnvVariables = () =>
  cleanEnv(process.env, {
    MYSQL_PORT: port(),
    MYSQL_HOST: str(),
    MYSQL_DATABASE: str(),
    MYSQL_PASSWORD: str(),
    MYSQL_USERNAME: str(),
  });
