import puppeteer, { Browser, Page } from 'puppeteer';
import { browserOptions, selectors } from './Scraper.options';
import * as dotenv from 'dotenv';
dotenv.config();

const { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD } = process.env;

export default class Scraper {
  private url: string = 'https://www.instagram.com/';
  private browser: Browser | undefined;
  private page: Page | undefined;

  constructor() {}

  public async initializeScraper() {
    this.browser = await puppeteer.launch(browserOptions);
    this.page = await this.browser.newPage();

    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36',
    );
    await this.page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });

    await this.page.goto(this.url);

    this.page.waitForNetworkIdle();
    await this.acceptCockies();
    console.log('Accepted cookies');

    await this.login(INSTAGRAM_USERNAME!, INSTAGRAM_PASSWORD!);
    console.log('Logged in');

    await this.turnOffNotifications();
    console.log('Turned off notifications');
  }

  private async sleep(page: puppeteer.Page, min: number, max: number) {
    const sleepDuration = await this.randomInterval(min, max);
    console.log('Waiting for ' + sleepDuration / 1000, 'seconds...');
    await page.waitForTimeout(sleepDuration);
  }

  private async randomInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private async acceptCockies() {
    if (this.page) {
      await this.page.waitForXPath(selectors.cookies.cookiesButton);
      const acceptCockiesButton = (await this.page?.$x(selectors.cookies.cookiesButton))[0];
      await this.page?.evaluate((element) => {
        element.focus();
        element.click();
      }, acceptCockiesButton);
      return;
    }
  }

  private async login(username: string, password: string) {
    if (this.page) {
      await this.page.waitForNetworkIdle();

      await this.page.click(selectors.login.username);
      await this.page.keyboard.type(username, { delay: 100 });
      await this.page.click(selectors.login.password);
      await this.page.keyboard.type(password, { delay: 100 });

      await this.page.waitForNetworkIdle();
      await this.sleep(this.page, 1000, 2000);

      await this.page.click(selectors.login.loginButton);
      await this.page.waitForNavigation();
    }
  }

  private async turnOffNotifications() {
    if (this.page) {
      await this.page.waitForNetworkIdle();
      await this.page.waitForXPath(selectors.login.notificationsOff);
      await this.sleep(this.page, 1000, 2000);
      const notificationsOffButton = (await this.page?.$x(selectors.login.notificationsOff))[4];
      await this.page?.evaluate((element) => {
        element.focus();
        element.click();
      }, notificationsOffButton);
      return;
    }
  }
}
