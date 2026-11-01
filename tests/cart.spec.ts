import {test, expect} from '../fixtures/myfixtures';

test.beforeEach(async({inventory})=>
{
    await inventory.goto();
})

test("Add to cart", {tag:'@smoke'},async({ inventory})=>
{
    await inventory.addToCart("Sauce Labs Backpack");
    await inventory.cartLink.click();
    await expect(inventory.cartBadge).toHaveText('1');
})

test("remove from Cart",{tag:'@regression'}, async({inventory})=>
{
    await inventory.addToCart("Sauce Labs Backpack");
    await inventory.cartLink.click();
    await inventory.removeItem("Sauce Labs Backpack");
    await expect(inventory.cartBadge).toHaveCount(0);

})

test("Logout", {tag:'@regression'}, async({inventory,page})=>
{
    await inventory.menuItem.click();
    await inventory.logOut();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
})

