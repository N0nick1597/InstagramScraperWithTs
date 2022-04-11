import puppeteer, { Browser, Page } from 'puppeteer';
import { browserOptions, selectors } from './Scraper.options';
var extract = require('html-extract');
import * as dotenv from 'dotenv';
dotenv.config();

const { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD } = process.env;

export default class Scraper {
  private url: string = 'https://www.instagram.com';
  private profileUrl: string = 'https://www.instagram.com/simonas_ivanovas';
  private browser: Browser | undefined;
  private page: Page | undefined;

  constructor() {}

  public async initializeScraper() {
    this.browser = await puppeteer.launch(browserOptions);

    const incognitoContext = await this.browser.createIncognitoBrowserContext();

    this.page = await incognitoContext.newPage();

    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36',
    );
    await this.page.setViewport({
      width: 1280,
      height: 800,
    });

    await this.page.goto(this.url);

    this.page.waitForNetworkIdle();
    await this.acceptCockies();
    console.log('Accepted cookies...');

    // await this.login('crawy159', 'crawy1597');
    await this.login('vardaspavarde159', 'vardaspavarde1597');
    await this.sleepPage(this.page, 5000, 10000);

    this.page.goto(this.profileUrl);
    await this.sleepPage(this.page, 5000, 10000);

    await this.scrollToEndOfPage(this.page, 50);

    await this.sleepPage(this.page, 5000, 10000);

    const basicProfileData = await this.getBasicProfileData(this.page);
    console.log(basicProfileData);

    for (let iterator = 1; iterator <= 11; iterator++) {
      await this.sleep(1000, 2000);
      for (let iterator2 = 1; iterator2 <= 3; iterator2++) {
        const likesAndComments = await this.getPostLikes(this.page, iterator, iterator2);
        console.log(likesAndComments);
      }
    }

    // this.browser.close();
  }

  private async getBasicProfileData(page: puppeteer.Page) {
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);

    var data = extract(bodyHTML, {
      profileName: function ($: (arg0: string) => { (): any; new (): any; text: { (): string; new (): any } }) {
        return $('#react-root > section > main > div > header > section > div.XBGH5 > h2').text().trim();
      },

      postsCount: function ($: (arg0: string) => { (): any; new (): any; text: { (): string; new (): any } }) {
        return $('#react-root > section > main > div > header > section > ul > li:nth-child(1) > div > span')
          .text()
          .trim();
      },

      followersCount: function ($: (arg0: string) => { (): any; new (): any; text: { (): string; new (): any } }) {
        return $('#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > div > span')
          .text()
          .trim();
      },

      followingsCount: function ($: (arg0: string) => { (): any; new (): any; text: { (): string; new (): any } }) {
        return $('#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > div > span')
          .text()
          .trim();
      },

      bio: function ($: (arg0: string) => { (): any; new (): any; text: { (): string; new (): any } }) {
        return $(
          '#react-root > section > main > div > header > section > div.QGPIr > div._7UhW9.vy6Bb.MMzan.KV-D4.uL8Hv.T0kll',
        )
          .text()
          .trim();
      },
    });

    return data;
  }

  private async getPostLikes(page: puppeteer.Page, iterator: number, iterator2: number) {
    await page.hover(
      '#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(' +
        iterator +
        ') > div:nth-child(' +
        iterator2 +
        ') > a > div.eLAPa > div._9AhH0',
    );
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);

    var data = extract(bodyHTML, {
      likesCount: function ($: (arg0: string) => { (): any; new (): any; text: { (): string; new (): any } }) {
        return $(
          '#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(' +
            iterator +
            ') > div:nth-child(' +
            iterator2 +
            ') > a > div.qn-0x > ul > li:nth-child(1) > div > span',
        )
          .text()
          .trim();
      },

      commentsCount: function ($: (arg0: string) => { (): any; new (): any; text: { (): string; new (): any } }) {
        return $(
          '#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(' +
            iterator +
            ') > div:nth-child(' +
            iterator2 +
            ') > a > div.qn-0x > ul > li:nth-child(2) > div > span',
        )
          .text()
          .trim();
      },
    });

    return data;
  }

  private async sleepPage(page: puppeteer.Page, min: number, max: number) {
    const sleepDuration = await this.randomInterval(min, max);
    console.log('Waiting for ' + sleepDuration / 1000, 'seconds...');
    await page.waitForTimeout(sleepDuration);
  }

  private async sleep(min: number, max: number) {
    const sleepDuration = await this.randomInterval(min, max);
    console.log('Waiting for ' + sleepDuration / 1000, 'seconds...');
    return new Promise((resolve) => setTimeout(resolve, sleepDuration));
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
      await this.sleepPage(this.page, 1000, 2000);

      await this.page.click(selectors.login.loginButton);

      console.log('Logged in...');

      await this.page.waitForNavigation();
    }
  }

  private async scrollToEndOfPage(page: puppeteer.Page, postAmount: number) {
    let previousHeight;
    let postLimiter = 0;
    while (postLimiter === postAmount) {
      postLimiter = +10;
      const curHeight = await page.evaluate('document.body.scrollHeight');
      if (previousHeight === curHeight) {
        break;
      }
      previousHeight = curHeight;
      await page.evaluate('window.scrollTo(1000, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await this.sleepPage(page, 1000, 10000);
    }
  }
}
