/**
 * @fileoverview
 * Playwright E2E tests for the Signup functionality.
 * Covers:
 *  - Registering a user with valid credentials.
 *  - Handling already existing user account.
 *
 */
import { test, expect } from '@playwright/test';
import { SignupPage } from '../pageobjects/SignupPage';
import SIGNUP from '../test-data/signup-test-data.json';
import logger from '../utils/logger';

let dynamicName: string;

test.describe('Signup Flow', () => {
    let signup: SignupPage;

    test.beforeEach(async ({ page }) => {
        signup = new SignupPage(page);
        await signup.goToSignupPage();
    });

    /**
     * Test Case 5: Register with an existing email
     * Verifies that an appropriate error message is displayed
     * when trying to sign up with an already registered email.
     */
    test('TC_05: Should display error for existing email during registration', async () => {
        await test.step('Attempt to sign up with existing credentials', async () => {
            await signup.signupWithExistingAccount(SIGNUP.existName, SIGNUP.existEmail);
        });

        await test.step('Verify error message is displayed', async () => {
            try {
                await expect(signup.page.getByText('Email Address already exist!')).toBeVisible({ timeout: 3000 });
                logger.info('✅ Error message correctly displayed for existing email.');
            } catch (error) {
                const screenshotName = `bug_existing_email_${Date.now()}.png`;
                logger.error('❌ Bug: User was able to register with an existing email.');
                await signup.page.screenshot({ path: `screenshots/${screenshotName}`, fullPage: true });
                throw new Error('Bug: Expected error for existing email was not shown.');
            }
        });
    });

    /**
     * Test Case 1: Successful Signup and Account Deletion
     * Signs up with valid data, validates account creation, and deletes the account.
     */
    test('TC_01: Dynamic Signup and Account Deletion', async () => {

        await test.step('Fill signup form with dynamic data', async () => {
            const userData = await signup.fillSignupForm(); // no args, faker will handle
            dynamicName = userData.name;
        });

        await test.step('Complete account creation form', async () => {
            await signup.fillCreateAccountForm();
        });

        await test.step('Verify account creation success', async () => {
            await expect(signup.page.locator("h2.title.text-center > b")).toHaveText('Account Created!');
        });

        await test.step('Verify logged-in user name matches generated name', async () => {
            await signup.clickContinue();
            await expect(signup.page.locator("li b")).toHaveText(dynamicName);
        });

        await test.step('Delete user account', async () => {
            await signup.deleteAccount();
            await expect(signup.page.getByText('Account Deleted!')).toBeVisible();
        });
    });
});
