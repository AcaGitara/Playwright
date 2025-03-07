const { test, expect, chromium } = require('@playwright/test');
const { performLogin, checkInventoryItem } = require('../helpers/auth'); 

test('check inventory item, view details and log font info with screenshots', async ({ page }) => {
    
    const screenshotPath = 'C:\\Users\\aleks\\source\\repos\\playwright-project\\ScreenShoots\\';

    
    async function takeScreenshot(page, step) {
        await page.screenshot({ path: `${screenshotPath}step-${step}.png` });
    }

    await page.goto('https://www.saucedemo.com/');
    await takeScreenshot(page, 1); 

    
    await performLogin(page, 'standard_user', 'secret_sauce');
    await takeScreenshot(page, 2); 

   
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await takeScreenshot(page, 3); 

    // Check if the inventory contains a given item
    const itemExists = await checkInventoryItem(page, 'Sauce Labs Bike Light');
    console.log('Item exists:', itemExists); 
    await takeScreenshot(page, 4); 

    if (itemExists) {
        // Click on the 'Sauce Labs Bike Light' inventory item to open the details
        await page.click('.inventory_item_name', { text: 'Sauce Labs Bike Light' });
        await takeScreenshot(page, 5); 

        // Collecting information about the font and text size for the article name
        const nameFontInfo = await page.$eval('.inventory_details_name.large_size', element => {
            const style = window.getComputedStyle(element);
            return {
                font: style.fontFamily,
                size: style.fontSize
            };
        });
        console.log('Name Font info:', nameFontInfo);
        await takeScreenshot(page, 6); 

        // Collect information about the font and size of the text for the description of the item
        const descFontInfo = await page.$eval('.inventory_details_desc.large_size', element => {
            const style = window.getComputedStyle(element);
            return {
                font: style.fontFamily,
                size: style.fontSize
            };
        });
        console.log('Description Font info:', descFontInfo);
        await takeScreenshot(page, 7);

        // Collecting information about the font and size of the text for the price of the item
        const priceFontInfo = await page.$eval('.inventory_details_price', element => {
            const style = window.getComputedStyle(element);
            return {
                font: style.fontFamily,
                size: style.fontSize
            };
        });
        console.log('Price Font info:', priceFontInfo);
        await takeScreenshot(page, 8); 

        
        await page.waitForTimeout(5000); 

        // Back to the page with Inventory 
        await page.click('#back-to-products');
        await takeScreenshot(page, 9); 
    } else {
        console.log('Item not found in inventory.');
    }
});

