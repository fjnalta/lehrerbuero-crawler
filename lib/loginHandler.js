"use strict";

const config = require('../config');

class LoginHandler {

    login = async (browser) => {
        let loginPage = await browser.newPage();

        await loginPage.goto('https://www.lehrerbuero.de/anmelden.html');
        await loginPage.waitForNetworkIdle();

        // Accept cookies
        await loginPage.click('#uc-btn-accept-banner');

        // Login
        await loginPage.type('#user', config.username);
        await loginPage.type('#pass', config.password);
        await loginPage.click('button[name="submit"]');

        await loginPage.waitFor(5000);

        // Get cookies
        let cookies = await loginPage.cookies();

        return cookies;
    }
}

module.exports = LoginHandler;