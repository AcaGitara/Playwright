const { test, expect, chromium } = require('@playwright/test');
const { performLogin, addItemToCart, fillCheckoutForm } = require('../helpers/auth'); 

test('login, add item to cart, open cart, checkout, fill form, continue, finish, check order confirmation, back home, and logout with screenshots', async ({ page }) => {
    
    const screenshotPath = 'C:\\Users\\aleks\\source\\repos\\playwright-project\\ScreenShoots\\'; 

    async function takeScreenshot(page, step) {
        await page.screenshot({ path: `${screenshotPath}step-${step}.png` });
    }

    await page.goto('https://www.saucedemo.com/');

    
    await performLogin(page, 'standard_user', 'secret_sauce');

    
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await takeScreenshot(page, 1); 

    
    await addItemToCart(page, 'Sauce Labs Backpack');
    await takeScreenshot(page, 2); 

    
    await page.click('#shopping_cart_container .shopping_cart_link');
    await takeScreenshot(page, 3); 

    
    await page.click('#checkout');
    await takeScreenshot(page, 4); 

    // Fill form for checkout 
    await fillCheckoutForm(page, 'John', 'Doe', '12345');
    await takeScreenshot(page, 5); 

    
    await page.click('#continue');
    await takeScreenshot(page, 6); 

    
    await page.click('#finish');
    await takeScreenshot(page, 7); 

    // Check existence of the text  "Thank you for your order!"
    const orderConfirmation = await page.$('h2.complete-header[data-test="complete-header"]');
    if (orderConfirmation) {
        console.log('Order confirmation text is present');
        
        await page.click('#back-to-products');
        await takeScreenshot(page, 8); 

        
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log('URL is correct after clicking Back Home');
        await takeScreenshot(page, 9); 
    } else {
        console.log('Order confirmation text is not present');
    }

    
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await takeScreenshot(page, 10); 

});
