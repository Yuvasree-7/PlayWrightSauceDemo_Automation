import { Page, Locator } from '@playwright/test';

export class CartPage {

    constructor(private page: Page) {}

    getCartItem(): Locator {
        return this.page.locator('.inventory_item_name');
    }

}