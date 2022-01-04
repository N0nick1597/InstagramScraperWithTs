import express, { NextFunction, Request, Response } from 'express';

import { logger } from './Middlewares/logger';
import type { Controller } from './Modules/types';
import Context from './Middlewares/context';

import UserService from './Modules/User/User.service';

export default class Bootstrap {
  private app: express.Application;

  private port = process.env.API_PORT;
  private controllers: Controller[];

  constructor(controllers: Controller[]) {
    this.app = express();
    this.controllers = controllers;

    this.setExpressConfig();
    this.mount();
  }

  private setExpressConfig(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use((req: Request, _: Response, next: NextFunction) => {
      Context.bind(req);
      next();
    });
    this.app.use(logger);
  }

  private mount(): void {
    this.app.get('/', (_, res: express.Response) => res.send('Hello World!'));
    this.controllers.forEach(({ router }: Controller) => this.app.use(router));
  }

  listen(): void {
    this.app.listen(this.port, () => console.log(`App listening at http://localhost:${this.port}`));
  }
}
