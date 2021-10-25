const Apify = require('apify');
const { log } = Apify.utils;

Apify.main(async () => {
    // Get the username and password inputs
    //const input = await Apify.getValue('INPUT');

    const browser = await Apify.launchPuppeteer();
    const page = await browser.newPage();
    await page.goto('https://www.lehrerbuero.de/anmelden.html');
    await page.waitForNetworkIdle();

    // Accept cookies
    await page.click('#uc-btn-accept-banner');

    // Login
    await page.type('#user', '123');
    await page.type('#pass', '345');
    await page.click('button[name="submit"]');
    await page.waitForNetworkIdle();

    // Get cookies
    const cookies = await page.cookies();

    // Use cookies in another tab or browser
    //const page2 = await browser.newPage();
    //await page2.setCookie(cookies);

    // Open the page as a logged-in user
    //await page2.goto('https://www.lehrerbuero.de/mydocuments');

    //await browser.close();

    //log.info('Done.');
});