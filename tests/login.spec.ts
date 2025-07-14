import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';

test.describe('Login Tests with Dynamic Data and Best Practices', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await test.step('Navigate to website and go to login page', async () => {
      await loginPage.navigate();
      await loginPage.goToLoginPage();
    });
  });

  test('Login with correct credentials', async ({ page }) => {
    const validEmail = process.env.VALID_EMAIL!;
    const validPassword = process.env.VALID_PASSWORD!;

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(validEmail, validPassword);
    });

    await test.step('Verify user is logged in', async () => {
      await expect(page.locator('li b')).toHaveText(/.+/); // Verify some name is shown
    });
  });

  test('Login with invalid credentials', async ({ page }) => {
    const invalid = await loginPage.getRandomCredentials();

    await test.step('Try logging in with invalid credentials', async () => {
      await loginPage.login(invalid.email, invalid.password);
    });

    await test.step('Verify error message', async () => {
      await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    });
  });

  test('Logout after login', async ({ page }) => {
    const validEmail = process.env.VALID_EMAIL!;
    const validPassword = process.env.VALID_PASSWORD!;

    await loginPage.login(validEmail, validPassword);
    await expect(page.locator('li b')).toBeVisible();

    await test.step('Logout the user', async () => {
      await loginPage.logout();
    });

    await expect(page.getByText('Login to your account')).toBeVisible();
  });
});
