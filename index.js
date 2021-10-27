const Apify = require('apify');

const { log } = Apify.utils;

const config = require('./config');

Apify.main(async () => {
    const browser = await Apify.launchPuppeteer();

    // const page = await browser.newPage();
    //
    // await page.goto('https://www.lehrerbuero.de/anmelden.html');
    // await page.waitForNetworkIdle();
    //
    // // Accept cookies
    // await page.click('#uc-btn-accept-banner');
    //
    // // Login
    // await page.type('#user', config.username);
    // await page.type('#pass', config.password);
    // await page.click('button[name="submit"]');
    //
    // await page.waitFor(5000);
    // //await page.waitForNetworkIdle();
    //
    // // Get cookies
    // const cookies = await page.cookies();
    //
    // // Use cookies in another tab or browser
    // const page2 = await browser.newPage();
    // await page2.setCookie(...cookies);
    //
    // // Open the page as a logged-in user
    // await page2.goto('https://www.lehrerbuero.de/dokumente.html');
    // await page2.waitForNetworkIdle();

    const page2 = await browser.newPage();
    await page2.goto('http://127.0.0.1:3000');


    const dimensions = await page2.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio,
        };
    });

    console.log('Dimensions:', dimensions);

    const files = await page2.evaluate(() => {
        let elements = Array.from(document.querySelectorAll('table.file-listing tbody tr.filetype-file td.file-title a'));
        let href = elements.map(element => {
            return element.href;
        });
        return href;
    });

    console.log("Number of Files: " + files.length);

    for(let i = 0; i < files.length; i++) {
        console.log(files[i]);
    }

    //await browser.close();

    //log.info('Done.');
});