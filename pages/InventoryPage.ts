import { Locator, Page } from '@playwright/test';

export class InventoryPage {

    constructor(private page: Page) {}

     getTitle():Locator {
        return this.page.locator('.title');
    }
    async addBackpackToCart() {
    await this.page.locator('#add-to-cart-sauce-labs-backpack').click();
}

    getCartBadge(): Locator {
        return this.page.locator('.shopping_cart_badge');
    }
   
    async clickCart() {
    await this.page.locator('.shopping_cart_link').click();
}

}