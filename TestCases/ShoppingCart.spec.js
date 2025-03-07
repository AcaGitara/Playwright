const { test, expect, chromium } = require('@playwright/test');
const { performLogin } = require('../helpers/auth'); // Uvezi funkcije

test('login, click on shopping cart, check buttons, and logout with screenshots', async ({ page }) => {
    // Path for saving screenshots
    const screenshotPath = 'C:\\Users\\aleks\\source\\repos\\playwright-project\\ScreenShoots\\'; // Ispravljena putanja

    // Function for screenshots
    async function takeScreenshot(page, step) {
        await page.screenshot({ path: `${screenshotPath}step-${step}.png` });
    }

    await page.goto('https://www.saucedemo.com/');

    // Log in method
    await performLogin(page, 'standard_user', 'secret_sauce');

    // Check URL after login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await takeScreenshot(page, 1); // Snimak ekrana nakon učitavanja stranice

    // Click on the basket button
    await page.click('#shopping_cart_container .shopping_cart_link');
    await takeScreenshot(page, 2); // Screenshot after click on basket button 

    // Checking availability of buttons  "Continue Shopping" and "Checkout"
    const continueShoppingButton = await page.$('#continue-shopping');
    const checkoutButton = await page.$('#checkout');
    if (continueShoppingButton) {
        console.log('Continue Shopping button is present');
    } else {
        console.log('Continue Shopping button is not present');
    }
    if (checkoutButton) {
        console.log('Checkout button is present');
    } else {
        console.log('Checkout button is not present');
    }
    await takeScreenshot(page, 3); // Screenshot after checking availability

    // Click on menu and logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await takeScreenshot(page, 4); // Screenshot after logout

    // Pause for manual check befor closing of the browser
    await page.waitForTimeout(2000); 
});
