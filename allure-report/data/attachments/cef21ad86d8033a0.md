# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Intentional failure test
- Location: tests/login.spec.ts:58:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.title')
Expected: "Inventory"
Received: "Products"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.title')
    14 × locator resolved to <span class="title" data-test="title">Products</span>
       - unexpected value "Products"

```

```yaml
- text: Products
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage';
  3  | import { InventoryPage } from '../pages/InventoryPage';
  4  | 
  5  | test('Valid login should navigate to inventory page', async ({ page }) => {
  6  | 
  7  |     // Create objects
  8  |     const loginPage = new LoginPage(page);
  9  |     const inventoryPage = new InventoryPage(page);
  10 | 
  11 |     // Open SauceDemo
  12 |     await loginPage.navigate();
  13 | 
  14 |     // Login with valid credentials
  15 |     await loginPage.login('standard_user', 'secret_sauce');
  16 | 
  17 |     // Verify Products page
  18 |     await expect(inventoryPage.getTitle()).toHaveText('Products');
  19 |     await inventoryPage.addBackpackToCart();
  20 | 
  21 |     await expect(inventoryPage.getCartBadge()).toHaveText('1');
  22 | });
  23 | 
  24 | test('Invalid username should display error message', async ({ page }) => {
  25 | 
  26 |     const loginPage = new LoginPage(page);
  27 | 
  28 |     await loginPage.navigate();
  29 | 
  30 |     await loginPage.login(
  31 |         'wrong_user',
  32 |         'secret_sauce'
  33 |     );
  34 | 
  35 |     await expect(loginPage.getErrorMessage())
  36 |         .toContainText(
  37 |             'Username and password do not match'
  38 |         );
  39 | 
  40 | });
  41 | test('Invalid password should display error message', async ({ page }) => {
  42 | 
  43 |     const loginPage = new LoginPage(page);
  44 | 
  45 |     await loginPage.navigate();
  46 | 
  47 |     await loginPage.login(
  48 |         'standard_user',
  49 |         'wrong_password'
  50 |     );
  51 | 
  52 |     await expect(loginPage.getErrorMessage())
  53 |         .toContainText(
  54 |             'Username and password do not match'
  55 |         );
  56 | 
  57 | });
  58 | test('Intentional failure test', async ({ page }) => {
  59 | 
  60 |     const loginPage = new LoginPage(page);
  61 |     const inventoryPage = new InventoryPage(page);
  62 | 
  63 |     await loginPage.navigate();
  64 | 
  65 |     await loginPage.login(
  66 |         'standard_user',
  67 |         'secret_sauce'
  68 |     );
  69 | 
  70 |     // Intentionally wrong assertion
  71 |     await expect(inventoryPage.getTitle())
> 72 |         .toHaveText('Inventory');
     |          ^ Error: expect(locator).toHaveText(expected) failed
  73 | 
  74 | });
```