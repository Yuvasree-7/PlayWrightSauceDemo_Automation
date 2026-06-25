import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

    constructor(private page: Page) {}

    async clickCheckout() {
        await this.page.locator('#checkout').click();
    }

    async enterFirstName(firstName: string) {
        await this.page.locator('#first-name').fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.page.locator('#last-name').fill(lastName);
    }

    async enterPostalCode(postalCode: string) {
        await this.page.locator('#postal-code').fill(postalCode);
    }

    async clickContinue() {
        await this.page.locator('#continue').click();
    }

    getCheckoutTitle(): Locator {
        return this.page.locator('.title');
    }

}