const { test, expect, chromium } = require('@playwright/test');
const { performLogin } = require('../helpers/auth'); // Uvezi funkcije

test('login, scroll to end, scroll to top, and logout with screenshots for scrolling', async ({ page }) => {
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

    // Skrolovanje do kraja stranice
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    await takeScreenshot(page, 1); // Snimak ekrana nakon skrolovanja na dno

    // Skrolovanje nazad na vrh stranice
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });
    await takeScreenshot(page, 2); // Snimak ekrana nakon skrolovanja na vrh

    // Klik na dugme meni i logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    // Pauza za ručnu proveru pre zatvaranja pretraživača
    await page.waitForTimeout(2000); // 2000 milisekundi = 2 sekunde
});
