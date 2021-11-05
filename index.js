const puppeteer = require('puppeteer');
const path = require('path');
const downloadPath = path.resolve('./download');

const loginHandler = new (require('./lib/loginHandler'))();
const myDocumentsHandler = new (require('./lib/myDocumentsHandler'))();

async function crawler() {

    // setup puppeteer
    const browser = await puppeteer.launch({ headless : true });

    // login to account and get cookies
    let cookies = await loginHandler.login(browser);

    // open my Documents page
    let myDocumentsPage = await myDocumentsHandler.openPage(browser, cookies);

    // get files
    let files = await myDocumentsHandler.getItems(myDocumentsPage);

    console.log('Downloading ' + files.length + ' documents');

    // download files
    for (let i = 0; i < files.length; i++) {
        console.log('Downloading ' + files[i].name);
        await myDocumentsHandler.downloadItem(files[i], downloadPath, cookies);
    }
    browser.close();
}

crawler();
