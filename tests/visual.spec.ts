import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Tagged @visual so CI can skip these — visual baselines are environment-specific
// (macOS renders differently from CI's Linux), so they run locally only.
test.describe('Visual regression @visual', () => {

  test('login page looks correct', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveScreenshot('login-page.png');
  });

  test('products page looks correct', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page).toHaveScreenshot('products-page.png');
  });

});
