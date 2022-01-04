import { Repository, getRepository } from 'typeorm';

import UserEntity from './User.entity';

export default class UserRepository {
  userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = getRepository(UserEntity, process.env.MYSQL_NAME);
  }

  public get allUsers() {
    return this.userRepository.find();
  }
}
