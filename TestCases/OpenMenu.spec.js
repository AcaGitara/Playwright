const { test, expect, chromium } = require('@playwright/test');
const { performLogin } = require('../helpers/auth'); 

test('check menu items and logout', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/');

    
    await performLogin(page, 'standard_user', 'secret_sauce');

    
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Click on button with ID  'react-burger-menu-btn'
    await page.click('#react-burger-menu-btn');

    // Collecting items from menu 
    const menuItems = await page.$$eval('.bm-item-list a', elements =>
        elements.map(el => el.innerText)
    );
    console.log('Menu Items:', menuItems);

    
    await page.click('#logout_sidebar_link');

    a
    setTimeout(async () => {
        await browser.close();
    }, 2000); 
});
