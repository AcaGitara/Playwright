const { test, expect, chromium } = require('@playwright/test');
const { performLogin } = require('../helpers/auth'); // Uvezi funkcije

test('check menu items and logout', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/');

    // Pozivanje metode za logovanje sa parametrima
    await performLogin(page, 'standard_user', 'secret_sauce');

    // Provera URL-a nakon logovanja
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Klik na dugme sa ID-jem 'react-burger-menu-btn'
    await page.click('#react-burger-menu-btn');

    // Prikupljanje stavki menija
    const menuItems = await page.$$eval('.bm-item-list a', elements =>
        elements.map(el => el.innerText)
    );
    console.log('Menu Items:', menuItems);

    // Klik na stavku meni 'Logout'
    await page.click('#logout_sidebar_link');

    // Pauza od 2 sekunde pre zatvaranja pretraživača
    setTimeout(async () => {
        await browser.close();
    }, 2000); // 2000 milisekundi = 2 sekunde
});
