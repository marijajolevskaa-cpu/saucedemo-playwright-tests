import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('complete purchase flow from login to order confirmation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const checkout = new CheckoutPage(page);

  // Log in
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventory.expectLoaded();

  // Add a product and verify the cart badge shows 1
  await inventory.addItemToCart('Sauce Labs Backpack');
  await inventory.expectCartCount('1');

  // Go to cart and check out
  await inventory.goToCart();
  await checkout.startCheckout();
  await checkout.fillDetails('Marija', 'J', 'LV-1001');
  await checkout.finish();

  // Verify the order completed
  await checkout.expectOrderComplete();
});
