export const selectors = {
  cookies: {
    cookiesButton: `//button[@tabindex]`,
  },
  login: {
    username: `input[type=\"text\"]`,
    password: `input[type=\"password\"]`,
    loginButton: '.L3NKy',
    notificationsOff: `//button[@tabindex]`,
  },
};

export const browserOptions = {
  executablePath: '/usr/bin/google-chrome',
  headless: false,
  args: [
    '--no-sandbox',
    '--disable-setuid-sendbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
  ],
};
