import {test as base} from '@playwright/test'
import{LoginPage} from '../pages/LoginPage';
import{InventoryPage} from '../pages/InventoryPage';

type MyFixtures={
    login:LoginPage;
    inventory:InventoryPage
}

export const test= base.extend<MyFixtures>
({
    login: async({page}, use)=>
    {
        const login= new LoginPage(page);
        await use(login);

    },
inventory: async({page}, use)=>
{
    const inventory= new InventoryPage(page)
    await use(inventory);
}
})

export {expect} from '@playwright/test';