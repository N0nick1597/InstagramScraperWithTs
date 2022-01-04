import { Connection } from 'typeorm';

import Bootstrap from './Bootstrap';
import { createDatabaseConnection } from './Config/Database/Connection';

import UserController from './Modules/User/User.controller';
import initiateScrapper from './test';

console.log('starting node app...');

createDatabaseConnection()
  .then((connections: Connection[]) => {
    const app = new Bootstrap([new UserController()]);

    app.listen();

    initiateScrapper();

    return connections.forEach((connection: Connection) => {
      console.log(`${connection.name} connection created`);
    });
  })
  .catch((err) => {
    console.error(err);
    console.error(`MySql connection couldn't be created`);
  });
