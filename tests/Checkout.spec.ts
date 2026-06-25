import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('Complete order Successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

    await inventoryPage.addBackpackToCart();

    await inventoryPage.clickCart();

    await expect(cartPage.getCartItem())
        .toHaveText('Sauce Labs Backpack');

    await checkoutPage.clickCheckout();

    await checkoutPage.enterFirstName('Yuvasree');

    await checkoutPage.enterLastName('P');

    await checkoutPage.enterPostalCode('641035');

    await checkoutPage.clickContinue();

    await expect(checkoutPage.getCheckoutTitle())
        .toHaveText('Checkout: Overview');

    await checkoutOverviewPage.clickFinish();

    await expect(checkoutCompletePage.getConfirmationMessage())
        .toHaveText('Thank you for your order!');

});

test('Intentional failure during order confirmation', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.navigate();

    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addBackpackToCart();

    await inventoryPage.clickCart();

    await checkoutPage.clickCheckout();

    await checkoutPage.enterFirstName('Yuvasree');
    await checkoutPage.enterLastName('P');
    await checkoutPage.enterPostalCode('641035');

    await checkoutPage.clickContinue();

    await checkoutOverviewPage.clickFinish();

    // Intentionally wrong assertion
    await expect(
        checkoutCompletePage.getConfirmationMessage()
    ).toHaveText('Order Completed Successfully');

});