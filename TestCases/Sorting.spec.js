const { test, expect, chromium } = require('@playwright/test');
const { performLogin, checkInventoryItem, sortItems } = require('../helpers/auth');

test('login, sort items multiple times, and logout', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/');

    
    await performLogin(page, 'standard_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Sorting A to Z 
    await sortItems(page, 'az');

    // Sorting Z to A
    await sortItems(page, 'za');

    // Sorting by price ( from lower to higher)
    await sortItems(page, 'lohi');

    // Sorting by price ( from higher to lower)
    await sortItems(page, 'hilo');


    // Pause for manual check befor closing of the browser
    setTimeout(async () => {
        await browser.close();
    }, 2000);
});
