import puppeteer from 'puppeteer';

describe("show/hide an event details", () => {
  let browser;
  let page;
  jest.setTimeout(30000);

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      // slowMo: 250, // slow down by 250ms
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".Event");
  });

  afterAll(() => {
    browser.close();
  });


test('An event element is collpased by default', async () => {
  const eventDetails = await page.$('.Event .event__Details');
  expect(eventDetails).toBeNull();
});



});


