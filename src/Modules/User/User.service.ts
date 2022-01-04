import { instagram } from 'instagram-scraper-api'; // https://npm.io/package/instagram-scraper-api

import UserRepository from './User.repository';


export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public get allUsers() {
    return this.userRepository.allUsers;
  }

    public getUserInfo() {
      instagram
        .user('willsmith')
        .then((user) => console.log(user))
        .catch((err) => console.error(err));
    }
}
