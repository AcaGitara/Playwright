const { test, expect, chromium } = require('@playwright/test');
const { performLogin } = require('../helpers/auth'); 

test('login test', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/');

    
    await performLogin(page, 'standard_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    
    setTimeout(async () => {
        await browser.close();
    }, 2000); 

});
