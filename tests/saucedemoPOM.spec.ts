import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import {InventoryPage} from '../pages/InventoryPage';

test("Login Validation 1", async({page})=>
{
    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);

})

test("Login Validation 2", async({page})=>
{
    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("locked_out_user","secret_sauce");
    await expect(loginPage.errorMessage).toHaveText(/locked out/);
})

test("Add To Cart", async({page})=>
{
    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    const inventoryPage=new InventoryPage(page);
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.cartLink.click();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    


})

test("Remove from Cart",async ({page})=>
{
    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    const inventoryPage=new InventoryPage(page);
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.cartLink.click();
    await inventoryPage.removeItem("Sauce Labs Backpack");
    await expect(inventoryPage.cartBadge).toHaveCount(0);

})

test("Logout", async({page})=>
{
    const loginPage=new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    const inventoryPage=new InventoryPage(page);
    await inventoryPage.menuItem.click();
    await inventoryPage.logOut();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
})

