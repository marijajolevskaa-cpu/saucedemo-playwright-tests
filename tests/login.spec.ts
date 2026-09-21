import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// This block declares a group of related tests
test.describe('Login functionality', () => {
  let loginPage: LoginPage;

  // Runs automatically BEFORE each test in this describe block
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('successful login shows the products page', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('locked-out user sees an error message', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectError('locked out');
  });
});
