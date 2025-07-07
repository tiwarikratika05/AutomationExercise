import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage'
import LoginData from '../test-data/login-test-data.json'

test.describe('As a user, I should be able to login in the page', async () => {

    test('Test Case 2: Login User with correct email and password',
        async ({ page }) => {
            const loginpage = new LoginPage(page);
            await loginpage.goToWebsite();
            await loginpage.goToLoginPage();
            await loginpage.login(LoginData.validEmail, LoginData.validPassword);
            await expect(page.getByText('kratika')).toBeVisible();
    });
    test('Test Case 4: Logout User',
        async ({ page }) => {
            const loginpage = new LoginPage(page);
            await loginpage.goToWebsite();
            await loginpage.goToLoginPage();
            await loginpage.login(LoginData.validEmail, LoginData.validPassword);
            await expect(page.getByText('kratika')).toBeVisible();
            await loginpage.logout();
            await expect(page.getByText('Login to your account')).toBeVisible();

        });
    test('Test Case 3: Login User with incorrect email and password',
        async ({ page }) => {
            const loginpage = new LoginPage(page);
            await loginpage.goToWebsite();
            await loginpage.goToLoginPage();
            await loginpage.login(LoginData.invalidEmail, LoginData.invalidPassword);
            await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
        });

});