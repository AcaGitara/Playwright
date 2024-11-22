const { test, expect, chromium } = require('@playwright/test');
const { performLogin } = require('../helpers/auth'); // Uvezi funkcije

test('login, click on shopping cart, check buttons, and logout with screenshots', async ({ page }) => {
    // Definisanje putanje za čuvanje snimaka ekrana
    const screenshotPath = 'C:\\Users\\aleks\\source\\repos\\playwright-project\\ScreenShoots\\'; // Ispravljena putanja

    // Funkcija za snimanje ekrana
    async function takeScreenshot(page, step) {
        await page.screenshot({ path: `${screenshotPath}step-${step}.png` });
    }

    await page.goto('https://www.saucedemo.com/');

    // Pozivanje metode za logovanje sa parametrima
    await performLogin(page, 'standard_user', 'secret_sauce');

    // Provera URL-a nakon logovanja
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await takeScreenshot(page, 1); // Snimak ekrana nakon učitavanja stranice

    // Klik na dugme za korpu
    await page.click('#shopping_cart_container .shopping_cart_link');
    await takeScreenshot(page, 2); // Snimak ekrana nakon klika na korpu

    // Provera prisutnosti dugmadi "Continue Shopping" i "Checkout"
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
    await takeScreenshot(page, 3); // Snimak ekrana nakon provere dugmadi

    // Klik na dugme meni i logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await takeScreenshot(page, 4); // Snimak ekrana nakon logouta

    // Pauza za ručnu proveru pre zatvaranja pretraživača
    await page.waitForTimeout(2000); // 2000 milisekundi = 2 sekunde
});
