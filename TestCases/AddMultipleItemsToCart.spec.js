const { test, expect, chromium } = require('@playwright/test');
const { performLogin, addItemToCart, checkCartItems } = require('../helpers/auth'); 

test('login, add two items to cart, check cart, and logout with screenshots', async ({ page }) => {
    // Definition of the path where the screenshoot is saved
    const screenshotPath = 'C:\\Users\\aleks\\source\\repos\\playwright-project\\ScreenShoots\\'; 

    // Function of screenshoot 
    async function takeScreenshot(page, step) {
        await page.screenshot({ path: `${screenshotPath}step-${step}.png` });
    }

    await page.goto('https://www.saucedemo.com/');

    
    await performLogin(page, 'standard_user', 'secret_sauce');

    // Checking URL during loggin 
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await takeScreenshot(page, 1);

    // Adding the first item 
    await addItemToCart(page, 'Sauce Labs Backpack');
    await takeScreenshot(page, 2); 

    // Adding the second item 
    await addItemToCart(page, 'Sauce Labs Bike Light');
    await takeScreenshot(page, 3); 

    // Click on shopping cart button 
    await page.click('#shopping_cart_container .shopping_cart_link');
    await takeScreenshot(page, 4); 

    // Checking existing of the items is shopping cart 
    const expectedItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    const allItemsPresent = await checkCartItems(page, expectedItems);
    if (allItemsPresent) {
        console.log('All expected items are in the cart');
    } else {
        console.log('Some expected items are missing from the cart');
    }
    await takeScreenshot(page, 5); 

    // Logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await takeScreenshot(page, 6); 

});
