const { test, expect, chromium } = require('@playwright/test');
const { performLogin } = require('../helpers/auth'); // Connecting the functions

test('login, scroll to end, scroll to top, and logout with screenshots for scrolling', async ({ page }) => {
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

    // Scroll at the end of the page 
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    await takeScreenshot(page, 1); // Screenshot after scroll to the end of the page

    // Scroll to the top of the page
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });
    await takeScreenshot(page, 2); // Screenshotafter scroll to the top

    // Click on menu and logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    // Pause for manual check befor closing of the browser
    await page.waitForTimeout(2000); 
});
