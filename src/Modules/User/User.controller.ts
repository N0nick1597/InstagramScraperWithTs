import { Router, Response, Request } from 'express';

import type { Controller } from '../types';

import UserService from './User.service';

export default class UserController implements Controller {
  public path = '/users';
  public router = Router();

  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.initRoutes();
  }

  private async getAllUsers(_: Request, res: Response) {
    try {
      const users = await this.userService.allUsers;
      return res.json({ users });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Failed to get all users');
    }
  }

  initRoutes() {
    this.router.get(`${this.path}`, this.getAllUsers.bind(this));
  }
}
