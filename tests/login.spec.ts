import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('Valid login should navigate to inventory page', async ({ page }) => {

    // Create objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Open SauceDemo
    await loginPage.navigate();

    // Login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify Products page
    await expect(inventoryPage.getTitle()).toHaveText('Products');
    await inventoryPage.addBackpackToCart();

    await expect(inventoryPage.getCartBadge()).toHaveText('1');
});

test('Invalid username should display error message', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'wrong_user',
        'secret_sauce'
    );

    await expect(loginPage.getErrorMessage())
        .toContainText(
            'Username and password do not match'
        );

});
test('Invalid password should display error message', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'standard_user',
        'wrong_password'
    );

    await expect(loginPage.getErrorMessage())
        .toContainText(
            'Username and password do not match'
        );

});
test('Intentional failure test', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

  

});