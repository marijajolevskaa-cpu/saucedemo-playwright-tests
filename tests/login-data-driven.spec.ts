import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// A list of users we want to test, each with expected behavior
const users = [
  { username: 'standard_user', shouldLogIn: true },
  { username: 'problem_user', shouldLogIn: true },
  { username: 'performance_glitch_user', shouldLogIn: true },
  { username: 'locked_out_user', shouldLogIn: false },
];

test.describe('Login for different user types', () => {

  // Loop over the data — this GENERATES one test per user
  for (const user of users) {

    test(`login attempt for ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, 'secret_sauce');

      if (user.shouldLogIn) {
        // These users should reach the products page
        await expect(page.locator('.title')).toHaveText('Products');
      } else {
        // The locked-out user should see an error instead
        await loginPage.expectError('locked out');
      }
    });

  }
});
