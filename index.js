const puppeteer = require('puppeteer');
const path = require('path');
const downloadPath = path.resolve('./download');

const loginHandler = new (require('./lib/loginHandler'))();
const myDocumentsHandler = new (require('./lib/myDocumentsHandler'))();
const categoryHandler = new (require('./lib/categoryHandler'))();

async function crawler() {

    // setup puppeteer
    const browser = await puppeteer.launch({ headless : false });

    // login to account and get cookies
    let cookies = await loginHandler.login(browser);

    // open my Documents page
    let myDocumentsPage = await myDocumentsHandler.openPage(browser, cookies);

    // get files
    let files = await myDocumentsHandler.getItems(myDocumentsPage);

    // download files
    for (let i = 0; i < files.length; i++) {
        await myDocumentsHandler.downloadItem(files[i], downloadPath, cookies);
    }

    // generate URL's from categories
    //let categories = categoryHandler.generateCategoryURLs();
    //log.info("fetched the following category URL's");
    //for(let i = 0; i < categories.length; i++) {
    //    log.info(i+1 + ". " + categories[i]);
    //}

    // open categories in new tab
    // for(let i = 0; i < categories.length; i++) {
    //     // open new tab
    //     let categoryPage = await browser.newPage();
    //     // setup cookies
    //     categoryPage.setCookie(...cookies);
    //     // open current category
    //     await categoryPage.goto(categories[i]);
    //     await categoryPage.waitForNetworkIdle();
    //
    //     // TODO - check if last page is reached
    //     // get all items from current page
    //     let itemsFromPage = categoryHandler.getItemsFromPage(categoryPage);
    //
    //     for(let i = 0; i < itemsFromPage.length; i++) {
    //         let currentItem = itemsFromPage[i];
    //         // move current item to my documents
    //
    //
    //         // open new tab for my documents
    //         let myDocumentsPage = await browser.newPage();
    //         myDocumentsPage.setCookie(...cookies);
    //         await myDocumentsPage.goto('https://www.lehrerbuero.de/dokumente.html');
    //         await myDocumentsPage.waitForNetworkIdle();
    //
    //         // download current item
    //
    //         // remove item from my documents
    //
    //         // close my documents tab
    //         await myDocumentsPage.close();
    //     }
    //
    //     // check if this was the last page
    //     if(categoryHandler.isLastPage() === false) {
    //
    //     }
    //     // close category tab
    //     await categoryPage.close();
    // }


    // //await page.waitForNetworkIdle();
    //

    //
    // // Use cookies in another tab or browser
    // const page2 = await browser.newPage();
    // await page2.setCookie(...cookies);
    //
    // // Open the page as a logged-in user
    // await page2.goto('https://www.lehrerbuero.de/dokumente.html');
    // await page2.waitForNetworkIdle();

    // const page2 = await browser.newPage();
    // await page2.goto('http://127.0.0.1:3000');
    //
    //
    // const dimensions = await page2.evaluate(() => {
    //     return {
    //         width: document.documentElement.clientWidth,
    //         height: document.documentElement.clientHeight,
    //         deviceScaleFactor: window.devicePixelRatio,
    //     };
    // });
    //
    // console.log('Dimensions:', dimensions);
    //
    // const files = await page2.evaluate(() => {
    //     let elements = Array.from(document.querySelectorAll('table.file-listing tbody tr.filetype-file td.file-title a'));
    //     let href = elements.map(element => {
    //         return element.href;
    //     });
    //     return href;
    // });
    //
    // console.log("Number of Files: " + files.length);
    //
    // for(let i = 0; i < files.length; i++) {
    //     console.log(files[i]);
    // }

    //await browser.close();

    //log.info('Done.');
//});
}

crawler();
