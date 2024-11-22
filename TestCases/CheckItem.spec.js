const { test, expect, chromium } = require('@playwright/test');
const { performLogin, checkInventoryItem } = require('../helpers/auth'); 

test('check inventory item', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/');

    
    await performLogin(page, 'standard_user', 'secret_sauce');

    
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    
    const itemExists = await checkInventoryItem(page, 'Sauce Labs Bike Light');
    console.log('Item exists:', itemExists); 

    
    setTimeout(async () => {
        await browser.close();
    }, 2000); 
});
