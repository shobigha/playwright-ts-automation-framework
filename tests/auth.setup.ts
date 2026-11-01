import {test, expect} from '../fixtures/myfixtures';

test('login once and save the session', async({login,page})=>
{
    await login.goto();
    await login.login(process.env.APP_USER!, process.env.APP_PASS!);
    await expect(page).toHaveURL(/inventory/);
    await page.context().storageState({path: 'playwright/.auth/user.json'});

})
