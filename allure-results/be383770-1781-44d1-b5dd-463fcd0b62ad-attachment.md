# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Checkout.spec.ts >> Intentional failure during order confirmation
- Location: tests/Checkout.spec.ts:52:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.complete-header')
Expected: "Order Completed Successfully"
Received: "Thank you for your order!"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.complete-header')
    14 × locator resolved to <h2 class="complete-header" data-test="complete-header">Thank you for your order!</h2>
       - unexpected value "Thank you for your order!"

```

```yaml
- heading "Thank you for your order!" [level=2]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage';
  3  | import { InventoryPage } from '../pages/InventoryPage';
  4  | import { CartPage } from '../pages/CartPage';
  5  | import { CheckoutPage } from '../pages/CheckoutPage';
  6  | import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
  7  | import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
  8  | 
  9  | test('Complete order Successfully', async ({ page }) => {
  10 | 
  11 |     const loginPage = new LoginPage(page);
  12 |     const inventoryPage = new InventoryPage(page);
  13 |     const cartPage = new CartPage(page);
  14 |     const checkoutOverviewPage = new CheckoutOverviewPage(page);
  15 |     const checkoutCompletePage = new CheckoutCompletePage(page);
  16 |     const checkoutPage = new CheckoutPage(page);
  17 | 
  18 |     await loginPage.navigate();
  19 | 
  20 |     await loginPage.login(
  21 |         'standard_user',
  22 |         'secret_sauce'
  23 |     );
  24 | 
  25 |     await inventoryPage.addBackpackToCart();
  26 | 
  27 |     await inventoryPage.clickCart();
  28 | 
  29 |     await expect(cartPage.getCartItem())
  30 |         .toHaveText('Sauce Labs Backpack');
  31 | 
  32 |     await checkoutPage.clickCheckout();
  33 | 
  34 |     await checkoutPage.enterFirstName('Yuvasree');
  35 | 
  36 |     await checkoutPage.enterLastName('P');
  37 | 
  38 |     await checkoutPage.enterPostalCode('641035');
  39 | 
  40 |     await checkoutPage.clickContinue();
  41 | 
  42 |     await expect(checkoutPage.getCheckoutTitle())
  43 |         .toHaveText('Checkout: Overview');
  44 | 
  45 |     await checkoutOverviewPage.clickFinish();
  46 | 
  47 |     await expect(checkoutCompletePage.getConfirmationMessage())
  48 |         .toHaveText('Thank you for your order!');
  49 | 
  50 | });
  51 | 
  52 | test('Intentional failure during order confirmation', async ({ page }) => {
  53 | 
  54 |     const loginPage = new LoginPage(page);
  55 |     const inventoryPage = new InventoryPage(page);
  56 |     const cartPage = new CartPage(page);
  57 |     const checkoutPage = new CheckoutPage(page);
  58 |     const checkoutOverviewPage = new CheckoutOverviewPage(page);
  59 |     const checkoutCompletePage = new CheckoutCompletePage(page);
  60 | 
  61 |     await loginPage.navigate();
  62 | 
  63 |     await loginPage.login('standard_user', 'secret_sauce');
  64 | 
  65 |     await inventoryPage.addBackpackToCart();
  66 | 
  67 |     await inventoryPage.clickCart();
  68 | 
  69 |     await checkoutPage.clickCheckout();
  70 | 
  71 |     await checkoutPage.enterFirstName('Yuvasree');
  72 |     await checkoutPage.enterLastName('P');
  73 |     await checkoutPage.enterPostalCode('641035');
  74 | 
  75 |     await checkoutPage.clickContinue();
  76 | 
  77 |     await checkoutOverviewPage.clickFinish();
  78 | 
  79 |     // Intentionally wrong assertion
  80 |     await expect(
  81 |         checkoutCompletePage.getConfirmationMessage()
> 82 |     ).toHaveText('Order Completed Successfully');
     |       ^ Error: expect(locator).toHaveText(expected) failed
  83 | 
  84 | });
```