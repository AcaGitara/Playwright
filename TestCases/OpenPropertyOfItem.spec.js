const { test, expect, chromium } = require('@playwright/test');
const { performLogin, checkInventoryItem } = require('../helpers/auth'); // Uvezi funkcije

test('check inventory item, view details and log font info with screenshots', async ({ page }) => {
    // Definisanje putanje za čuvanje snimaka ekrana
    const screenshotPath = 'C:\\Users\\aleks\\source\\repos\\playwright-project\\ScreenShoots\\'; // Ispravljena putanja

    // Funkcija za snimanje ekrana
    async function takeScreenshot(page, step) {
        await page.screenshot({ path: `${screenshotPath}step-${step}.png` });
    }

    await page.goto('https://www.saucedemo.com/');
    await takeScreenshot(page, 1); // Snimak ekrana nakon otvaranja stranice

    // Pozivanje metode za logovanje sa parametrima
    await performLogin(page, 'standard_user', 'secret_sauce');
    await takeScreenshot(page, 2); // Snimak ekrana nakon logovanja

    // Provera URL-a nakon logovanja
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await takeScreenshot(page, 3); // Snimak ekrana nakon provere URL-a

    // Provera da li inventar sadrži zadati artikl
    const itemExists = await checkInventoryItem(page, 'Sauce Labs Bike Light');
    console.log('Item exists:', itemExists); // Log za proveru
    await takeScreenshot(page, 4); // Snimak ekrana nakon provere inventara

    if (itemExists) {
        // Klik na stavku inventara 'Sauce Labs Bike Light' kako bi se otvorili detalji
        await page.click('.inventory_item_name', { text: 'Sauce Labs Bike Light' });
        await takeScreenshot(page, 5); // Snimak ekrana nakon klika na artikl

        // Prikupljanje informacija o fontu i veličini teksta za naziv artikla
        const nameFontInfo = await page.$eval('.inventory_details_name.large_size', element => {
            const style = window.getComputedStyle(element);
            return {
                font: style.fontFamily,
                size: style.fontSize
            };
        });
        console.log('Name Font info:', nameFontInfo);
        await takeScreenshot(page, 6); // Snimak ekrana nakon prikupljanja informacija o fontu naziva

        // Prikupljanje informacija o fontu i veličini teksta za opis artikla
        const descFontInfo = await page.$eval('.inventory_details_desc.large_size', element => {
            const style = window.getComputedStyle(element);
            return {
                font: style.fontFamily,
                size: style.fontSize
            };
        });
        console.log('Description Font info:', descFontInfo);
        await takeScreenshot(page, 7); // Snimak ekrana nakon prikupljanja informacija o fontu opisa

        // Prikupljanje informacija o fontu i veličini teksta za cenu artikla
        const priceFontInfo = await page.$eval('.inventory_details_price', element => {
            const style = window.getComputedStyle(element);
            return {
                font: style.fontFamily,
                size: style.fontSize
            };
        });
        console.log('Price Font info:', priceFontInfo);
        await takeScreenshot(page, 8); // Snimak ekrana nakon prikupljanja informacija o fontu cene

        // Čekanje za pregled pre zatvaranja pretraživača
        await page.waitForTimeout(5000); // 5000 milisekundi = 5 sekundi

        // Vraćanje na stranicu sa inventarom
        await page.click('#back-to-products');
        await takeScreenshot(page, 9); // Snimak ekrana nakon vraćanja na inventar
    } else {
        console.log('Item not found in inventory.');
    }
});

