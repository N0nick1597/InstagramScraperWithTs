import { Connection } from 'typeorm';
import { createDatabaseConnection } from './Config/Database/Connection';

console.log('starting node app...');

createDatabaseConnection()
  .then((connections: Connection[]) => {
    return connections.forEach((connection: Connection) => {
      console.log(`${connection.name} connection created`);
    });
  })
  .catch((err) => {
    console.error(err);
    console.error(`MySql connection couldn't be created`);
  });
