const { test, expect, chromium } = require('@playwright/test');
const { performLogin, addItemToCart, fillCheckoutForm } = require('../helpers/auth'); // Uvezi funkcije

test('login, add item to cart, open cart, checkout, fill form, continue, finish, check order confirmation, back home, and logout with screenshots', async ({ page }) => {
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

    // Dodavanje artikla u korpu
    await addItemToCart(page, 'Sauce Labs Backpack');
    await takeScreenshot(page, 2); // Snimak ekrana nakon dodavanja artikla

    // Klik na dugme za korpu
    await page.click('#shopping_cart_container .shopping_cart_link');
    await takeScreenshot(page, 3); // Snimak ekrana nakon klika na korpu

    // Klik na dugme "Checkout"
    await page.click('#checkout');
    await takeScreenshot(page, 4); // Snimak ekrana nakon klika na "Checkout"

    // Popunjavanje forme za Checkout
    await fillCheckoutForm(page, 'John', 'Doe', '12345');
    await takeScreenshot(page, 5); // Snimak ekrana nakon popunjavanja forme

    // Klik na dugme "Continue"
    await page.click('#continue');
    await takeScreenshot(page, 6); // Snimak ekrana nakon klika na "Continue"

    // Klik na dugme "Finish"
    await page.click('#finish');
    await takeScreenshot(page, 7); // Snimak ekrana nakon klika na "Finish"

    // Provera da li postoji tekst "Thank you for your order!"
    const orderConfirmation = await page.$('h2.complete-header[data-test="complete-header"]');
    if (orderConfirmation) {
        console.log('Order confirmation text is present');
        // Klik na dugme "Back Home"
        await page.click('#back-to-products');
        await takeScreenshot(page, 8); // Snimak ekrana nakon klika na dugme "Back Home"

        // Provera URL-a nakon klika na "Back Home"
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log('URL is correct after clicking Back Home');
        await takeScreenshot(page, 9); // Snimak ekrana nakon provere URL-a
    } else {
        console.log('Order confirmation text is not present');
    }

    // Klik na dugme meni i logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await takeScreenshot(page, 10); // Snimak ekrana nakon logouta

});
