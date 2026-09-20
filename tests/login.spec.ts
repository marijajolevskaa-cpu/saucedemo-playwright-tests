import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { expect } from '@playwright/test';

test('successful login shows the products page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page.locator('.title')).toHaveText('Products');
});

test('locked-out user sees an error message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await loginPage.expectError('locked out');
});
