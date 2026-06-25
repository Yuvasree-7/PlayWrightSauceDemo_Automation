import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {

    constructor(private page: Page) {}

    getConfirmationMessage(): Locator {
        return this.page.locator('.complete-header');
    }

}