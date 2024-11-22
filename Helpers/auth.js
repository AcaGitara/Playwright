async function performLogin(page, username, password) {
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');
}

async function checkInventoryItem(page, itemName) {
    const items = await page.$$eval('.inventory_item_name', elements =>
        elements.map(el => el.innerText)
    );
    return items.includes(itemName);
}

// Funkcija za sortiranje artikala
async function sortItems(page, sortOrder) {
    await page.selectOption('.product_sort_container', sortOrder);
    const sortedItems = await page.$$eval('.inventory_item_name', elements =>
        elements.map(el => el.innerText)
    );
    console.log(`Sorted by ${sortOrder}:`, sortedItems);
}

// Nova funkcija za dodavanje artikla u korpu
async function addItemToCart(page, itemName) {
    // Provera da li inventar sadrži zadati artikl
    const itemExists = await checkInventoryItem(page, itemName);
    console.log('Item exists:', itemExists); // Log za proveru

    if (itemExists) {
        // Klik na dugme 'Add to cart' za zadati artikl
        const itemId = itemName.toLowerCase().replace(/ /g, '-');
        await page.click(`#add-to-cart-${itemId}`);
        console.log('Item added to cart');
    } else {
        console.log('Item not found in inventory.');
    }
}

// Metoda za proveru artikala u korpi
async function checkCartItems(page, expectedItems) {
    const cartItems = await page.$$eval('.inventory_item_name', elements =>
        elements.map(el => el.innerText)
    );
    console.log('Items in cart:', cartItems); // Log za artikle u korpi

    // Provera da li se očekivani artikli nalaze u korpi
    const missingItems = expectedItems.filter(item => !cartItems.includes(item));
    if (missingItems.length > 0) {
        console.log('Missing items in cart:', missingItems);
    } else {
        console.log('All expected items are in the cart');
    }

    return missingItems.length === 0;
}

// Nova funkcija za popunjavanje forme
async function fillCheckoutForm(page, firstName, lastName, postalCode) {
    await page.fill('#first-name', firstName);
    await page.fill('#last-name', lastName);
    await page.fill('#postal-code', postalCode);
}

// Kombinovanje izvoza u jedan objekat
module.exports = { performLogin, checkInventoryItem, sortItems, addItemToCart, checkCartItems, fillCheckoutForm };
