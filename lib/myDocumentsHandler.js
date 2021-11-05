"use strict";

const { promisify } = require('util');
const { createWriteStream } = require("fs");

const got = require('got');
const { CookieJar } = require('tough-cookie');

const cookieJar = new CookieJar();
const setCookie = promisify(cookieJar.setCookie.bind(cookieJar));

class MyDocumentsHandler {

    openPage = async (browser, cookies) => {
        let myDocumentsPage = await browser.newPage();
        // Setup cookies
        await myDocumentsPage.setCookie(...cookies);

        // Open page
        await myDocumentsPage.goto('https://www.lehrerbuero.de/dokumente.html');
        await myDocumentsPage.waitForNetworkIdle();

        return myDocumentsPage;
    }

    getItems = async (page) => {
        const files = await page.evaluate(() => {
            let result = [];
            let elements = Array.from(document.querySelectorAll('table.file-listing tbody tr.filetype-file td.file-title a'));
            elements.map(element => {
                result.push({
                    "name": element.title,
                    "href": element.href
                });
            });
            return result;
        });
        return files;
    }

    downloadItem = async (item, path, cookies) => {
        // transfer cookies from puppeteer to got
        cookies.forEach(
            async cookie => {
                await setCookie(
                    `${cookie.name}=${cookie.value}`,
                    'https://www.lehrerbuero.de'
                )
            }
        );

        // open URL via got and download file
        let downloadStream = got.stream(item.href, { cookieJar });
        let fileWriterStream = createWriteStream('./download/' + item.name);
        //let currentPercent = 0;

        downloadStream
            //.on("downloadProgress", ({ transferred, total, percent }) => {
            //    const percentage = Math.round(percent * 100);
            //    if(percentage > currentPercent) {
            //        console.log(`${item.name}: ${percentage}%`);
            //        currentPercent = percentage;
            //    }
            //})
            .on("error", (error) => {
                console.error(`Download failed: ${error.message}`);
            });
        fileWriterStream
            .on("error", (error) => {
                console.error(`Could not write file to system: ${error.message}`);
            })
            .on("finish", () => {
                console.log(`File downloaded - ${item.name}`);
            });
        downloadStream.pipe(fileWriterStream);
    }
}

module.exports = MyDocumentsHandler;