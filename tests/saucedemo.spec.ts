import {test, expect} from '@playwright/test'

test("Login validation 1", async ({page}) =>
{
    await page.goto("https://www.saucedemo.com/");
    const username= await page.locator('[data-test="username"]');
    await username.fill("standard_user");

    const password= await page.locator('[data-test="password"]');
    await password.fill("secret_sauce");

    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory/);
})

test("Login validation 2", async({page}) =>
{
    await page.goto("https://www.saucedemo.com/");
    const username=await page.locator('[data-test="username"]');
    await username.fill("locked_out_user");

    const password= await page.locator('[data-test="password"]');
    await password.fill("secret_sauce");

    await page.locator('[data-test="login-button"]').click();

    const errorMessage=await page.locator('[data-test="error"]');
    console.log(await errorMessage.textContent());
    await expect(errorMessage).toHaveText(/locked out/);

})

test("Add to Cart", async({page}) =>
{
    await page.goto("https://www.saucedemo.com/");
    const username=await page.locator('[data-test="username"]');
    await username.fill("standard_user");

    const password= await page.locator('[data-test="password"]');
    await password.fill("secret_sauce");

    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

})

test("Remove item from cart", async({page}) =>
{
    await page.goto("https://www.saucedemo.com/");
    const username=await page.locator('[data-test="username"]');
    await username.fill("standard_user");

    const password= await page.locator('[data-test="password"]');
    await password.fill("secret_sauce");

    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);

})


test("Logout", async({page}) =>
{
    await page.goto("https://www.saucedemo.com/");
    const username=await page.locator('[data-test="username"]');
    await username.fill("standard_user");

    const password= await page.locator('[data-test="password"]');
    await password.fill("secret_sauce");

    await page.locator('[data-test="login-button"]').click();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/");

})

