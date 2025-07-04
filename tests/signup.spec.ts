import { test, expect } from '@playwright/test';
import { SignupPage } from '../pageobjects/SignupPage';


test.describe('As a user, I should be able to Signup in the page', async () => {

    test('Test Case 5: Register User with existing email',
        async ({ page }) => {
            const signup = new SignupPage(page);
            await signup.goToSignupPage();
            await signup.alreadyExistAccount();
            await expect(page.getByText('Email Address already exist!')).toBeVisible();
        });

    test('Test Case 1: Signup with valid credentials and delete the same account',
        async ({ page }) => {
            const signup = new SignupPage(page);
            await signup.goToSignupPage();
            await signup.singUpForm();
            await signup.createAccountForm();
            await expect(page.locator("h2[class='title text-center'] b")).toHaveText(['Account Created!']);
            await signup.accountCreationScreen();
            expect(page.locator("li b")).toHaveText('kratika')
            await signup.deleteAccountScreen();
            await expect(page.getByText('Account Deleted!')).toBeVisible();

        });
});