import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';

export class LoginPage extends BasePage
{

    readonly username:Locator;
    readonly password : Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page:Page)
    {
        super(page);
        this.username=page.locator('[data-test="username"]');
        this.password= page.locator('[data-test="password"]');
        this.loginButton=page.locator('[data-test="login-button"]');
        this.errorMessage=page.locator('[data-test="error"]');
    }

    async goto()
    {
        await this.page.goto("/");
    }

    async login(user:string,pass:string)
    {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();

    }



}
