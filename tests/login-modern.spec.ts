import { test, expect } from '@playwright/test';

test('login using user-facing locators', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Placeholder text is what the user sees in the empty fields
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // The login control is a button the user would click
  await page.getByRole('button', { name: 'Login' }).click();

  // Assert the heading the user now sees
  await expect(page.getByText('Products')).toBeVisible();
});
