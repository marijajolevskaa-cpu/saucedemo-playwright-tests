import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const users = [
  { username: 'standard_user', shouldLogIn: true },
  { username: 'problem_user', shouldLogIn: true },
  { username: 'performance_glitch_user', shouldLogIn: true },
  { username: 'locked_out_user', shouldLogIn: false },
];

test.describe('Login for different user types', () => {

  for (const user of users) {

    test(`login attempt for ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, 'secret_sauce');

      if (user.shouldLogIn) {
        // Allow up to 15s here: performance_glitch_user is deliberately slow,
        // so the default 5s assertion timeout causes flaky failures.
        await expect(page.locator('.title')).toHaveText('Products', { timeout: 15000 });
      } else {
        await loginPage.expectError('locked out');
      }
    });

  }
});
