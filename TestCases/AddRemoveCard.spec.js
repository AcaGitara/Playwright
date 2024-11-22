const { test, expect, chromium } = require('@playwright/test');
const { performLogin, checkInventoryItem } = require('../helpers/auth');

test('login, check cart badge, add item to cart, check cart badge again, remove item, check cart badge, and logout with screenshots', async ({ page }) => {
    
    const screenshotPath = 'C:\\Users\\aleks\\source\\repos\\playwright-project\\ScreenShoots\\'; 

    async function takeScreenshot(page, step) {
        await page.screenshot({ path: `${screenshotPath}step-${step}.png` });
    }

    await page.goto('https://www.saucedemo.com/');

    
    await performLogin(page, 'standard_user', 'secret_sauce');

    
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Checking if shopping_cart_badge exists 
    const cartBadgeBefore = await page.$('.shopping_cart_badge');
    if (cartBadgeBefore) {
        const cartBadgeValueBefore = await cartBadgeBefore.textContent();
        console.log('Cart badge value before:', cartBadgeValueBefore);
    } else {
        console.log('Cart badge does not exist before adding to cart');
    }
    await takeScreenshot(page, 1);

    // Checking if item exists 
    const itemExists = await checkInventoryItem(page, 'Sauce Labs Backpack');
    console.log('Item exists:', itemExists); 

    if (itemExists) {
        // Click on Add to cart for  'Sauce Labs Backpack'
        await page.click('#add-to-cart-sauce-labs-backpack');
        console.log('Item added to cart');

        
        await page.waitForTimeout(1000); 
        await takeScreenshot(page, 2); 

        // Check if Remove button exists 
        const removeButton = await page.$('#remove-sauce-labs-backpack');
        if (removeButton) {
            console.log('Remove button is present');
            await takeScreenshot(page, 3); 
        } else {
            console.log('Remove button is not present');
        }

        // Checking the value of the `shopping_cart_badge` after edding in shopping cart
        const cartBadgeAfter = await page.$('.shopping_cart_badge');
        if (cartBadgeAfter) {
            const cartBadgeValueAfter = await cartBadgeAfter.textContent();
            console.log('Cart badge value after:', cartBadgeValueAfter);
        } else {
            console.log('Cart badge does not exist after adding to cart');
        }
        await takeScreenshot(page, 4); 

        // Click on  'Remove' button for 'Sauce Labs Backpack'
        await page.click('#remove-sauce-labs-backpack');
        console.log('Item removed from cart');

        
        await page.waitForTimeout(1000); 
        await takeScreenshot(page, 5); 

        // Checking the value of `shopping_cart_badge` after removing from shopping cart
        const cartBadgeAfterRemove = await page.$('.shopping_cart_badge');
        if (cartBadgeAfterRemove) {
            const cartBadgeValueAfterRemove = await cartBadgeAfterRemove.textContent();
            console.log('Cart badge value after removing item:', cartBadgeValueAfterRemove);
        } else {
            console.log('Cart badge does not exist after removing item');
        }
        await takeScreenshot(page, 6); 
    } else {
        console.log('Item not found in inventory.');
    }

    // Logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    
    await page.waitForTimeout(2000); 
});
