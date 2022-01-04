import UserService from './Modules/User/User.service';

export default async function initiateScrapper() {
  const userService = new UserService();

  userService.getUserInfo();
}
