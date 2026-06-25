import { Page, Locator } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.page.locator('#user-name').fill(username);
        await this.page.locator('#password').fill(password);
        await this.page.locator('#login-button').click();
    }

     getErrorMessage():Locator{
        return this.page.locator('[data-test="error"]');
    }
}