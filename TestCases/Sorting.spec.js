const { test, expect, chromium } = require('@playwright/test');
const { performLogin, checkInventoryItem, sortItems } = require('../helpers/auth'); // Uvezi sve funkcije

test('login, sort items multiple times, and logout', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/');

    // Pozivanje metode za logovanje sa parametrima
    await performLogin(page, 'standard_user', 'secret_sauce');

    // Provera URL-a nakon logovanja
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Sortiranje po imenu (A do Z)
    await sortItems(page, 'az');

    // Sortiranje po imenu (Z do A)
    await sortItems(page, 'za');

    // Sortiranje po ceni (od najniže do najviše)
    await sortItems(page, 'lohi');

    // Sortiranje po ceni (od najviše do najniže)
    await sortItems(page, 'hilo');


    // Pauza od 2 sekunde pre zatvaranja pretraživača
    setTimeout(async () => {
        await browser.close();
    }, 2000); // 2000 milisekundi = 2 sekunde
});
