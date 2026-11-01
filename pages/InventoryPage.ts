import {Page, Locator} from '@playwright/test';
import  {BasePage} from './BasePage';

export class InventoryPage extends BasePage
{
    readonly cartLink: Locator;
    readonly cartBadge:  Locator;
    readonly menuItem: Locator;
    readonly logOutButton:  Locator;

    constructor(page:Page)
    {
        super(page);
        this.cartLink=page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge=page.locator('[data-test="shopping-cart-badge"]');
        this.menuItem=page.getByRole('button', { name: 'Open Menu' });
        this.logOutButton=page.locator('[data-test="logout-sidebar-link"]');


    }

    async goto()
{
    await this.page.goto("/inventory.html");
}


    async addToCart(productName:string)
    {
        const slug=productName.toLowerCase().replace(/ /g,"-");
        await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
    }

    async removeItem(productName:string)
    {
        const slug=productName.toLowerCase().replace(/ /g,"-");
        await this.page.locator(`[data-test="remove-${slug}"]`).click();
    }

    async logOut()
    {
        await this.logOutButton.click();
    }






}