
import { test, expect } from '../fixtures/myfixtures';


test("Login Validation 1", async({page, login, inventory})=>
{
    await login.goto();
    await login.login(process.env.APP_USER!, process.env.APP_PASS!);
    await expect(page).toHaveURL(/inventory/);

})

test("Login Validation 2", async({ login, inventory})=>
{
    await login.goto();
    await login.login("locked_out_user","secret_sauce");
    await expect(login.errorMessage).toHaveText(/locked out/);
})

test("Add To Cart", async({page, login , inventory})=>
{
    await login.goto();
    await login.login("standard_user", "secret_sauce");

    await inventory.addToCart("Sauce Labs Backpack");
    await inventory.cartLink.click();
    await expect(inventory.cartBadge).toHaveText('1');
    


})

test("Remove from Cart",async ({page, login, inventory})=>
{
    
    await login.goto();
    await login.login("standard_user", "secret_sauce");

    
    await inventory.addToCart("Sauce Labs Backpack");
    await inventory.cartLink.click();
    await inventory.removeItem("Sauce Labs Backpack");
    await expect(inventory.cartBadge).toHaveCount(0);

})

test("Logout", async({page, login, inventory})=>
{
    await login.goto();
    await login.login("standard_user", "secret_sauce");

   
    await inventory.menuItem.click();
    await inventory.logOut();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
})

