import { test, expect } from '@playwright/test'
import { POManager } from '../pageobjects/POManager';
import { CommonObjects } from '../pageobjects/CommonObjects';
import { SignupPage } from '../pageobjects/SignupPage';
import { PaymentPage } from '../pageobjects/PaymentPage';
import { PlaceOrderPage } from '../pageobjects/PlaceOrderPage';
import { LoginPage } from '../pageobjects/LoginPage';

let poManager: POManager;
let commonObjects: CommonObjects;
let signupPage: SignupPage;
let paymentPage: PaymentPage;
let placeOrderPage: PlaceOrderPage;
let loginPage: LoginPage;
let username: string;
let email: string;
let firstName: string;
let lastName: string;
let phoneNum: string;

test.describe('E2E -Checkout and Place Order', () => {

    test.beforeEach('Preconditions: Launch site and setup pages', async ({ page }) => {
        poManager = new POManager(page);
        commonObjects = poManager.getCommonObjects();
        signupPage = poManager.getSignupPage();
        paymentPage = poManager.getPaymentPage();
        placeOrderPage = poManager.getPlaceOrderPage();
        loginPage = poManager.getLoginPage()

        await test.step('Launch browser and navigate to AutomationExercise site', async () => {
            await commonObjects.goToWebsite();
            await expect(page).toHaveURL("https://www.automationexercise.com/");
        });
    });

    test('Test Case 14: Register during Checkout & Place Order', async ({ page }) => {

        await test.step('Add product to cart and go to cart page', async () => {
            await placeOrderPage.addFirstProductAndViewCart();
            await expect(page).toHaveURL(/.*\/view_cart/);
        });

        await test.step('Proceed to checkout and open Register/Login page', async () => {
            await placeOrderPage.proceedToCheckoutAndOpenSignup();
        });


        await test.step('Fill signup and account creation details', async () => {
            ({ username, email } = await signupPage.fillSignupForm());
            ({ firstName, lastName, phoneNum } = await signupPage.fillCreateAccountForm());
        });

        await test.step("Verify account creation success and continue", async () => {
            await expect(page.locator(".title.text-center")).toHaveText("Account Created!");
            await signupPage.clickContinue();
            await expect(page.locator("b")).toHaveText(username);
        });

        await test.step("Reopen cart and proceed to checkout again", async () => {
            await placeOrderPage.proceedToCheckoutAndOpenAddress();
        });

        await test.step("Verify address, add comment and go to payment page", async () => {
            await placeOrderPage.verifyDeliveryAddressAndContinueToPayment(firstName, lastName, phoneNum);
        });

        await test.step("Enter payment info and confirm order", async () => {
            await paymentPage.fillCardDetails(firstName, lastName);
            await expect(page.locator(".title.text-center")).toHaveText("Order Placed!");
        });

        await test.step("Delete account and confirm deletion", async () => {
            await signupPage.deleteAccount();
            await expect(page.locator(".title.text-center")).toContainText("Account Deleted!");
        });
    });

    test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {
        await test.step('Fill signup and account creation details', async () => {
            await signupPage.goToSignupPage();
            ({ username, email } = await signupPage.fillSignupForm());
            ({ firstName, lastName, phoneNum } = await signupPage.fillCreateAccountForm());
        });
        await test.step("Verify account creation success and continue", async () => {
            await expect(page.locator(".title.text-center")).toHaveText("Account Created!");
            await signupPage.clickContinue();
            await expect(page.locator("b")).toHaveText(username);
        });
        await test.step('Add product to cart and go to cart page', async () => {
            await placeOrderPage.addFirstProductAndViewCart();
            await expect(page).toHaveURL(/.*\/view_cart/);
        });

        await test.step("Reopen cart and proceed to checkout again", async () => {
            await placeOrderPage.proceedToCheckoutAndOpenAddress();
        });

        await test.step("Verify address, add comment and go to payment page", async () => {
            await placeOrderPage.verifyDeliveryAddressAndContinueToPayment(firstName, lastName, phoneNum);
        });

        await test.step("Enter payment info and confirm order", async () => {
            await paymentPage.fillCardDetails(firstName, lastName);
            await expect(page.locator(".title.text-center")).toHaveText("Order Placed!");
        });

        await test.step("Delete account and confirm deletion", async () => {
            await signupPage.deleteAccount();
            await expect(page.locator(".title.text-center")).toContainText("Account Deleted!");
        });
    });

    test('Test Case 16: Place Order: Login before Checkout', async ({ page }) => {
        const validEmail = process.env.VALID_EMAIL!;
        const validPassword = process.env.VALID_PASSWORD!;

        await test.step('Login with valid credentials', async () => {
            await loginPage.goToLoginPage();
            await loginPage.login(validEmail, validPassword);
        });
        
        await test.step('Add product to cart and go to cart page', async () => {
            await placeOrderPage.addFirstProductAndViewCart();
            await expect(page).toHaveURL(/.*\/view_cart/);
        });

        await test.step("Reopen cart and proceed to checkout again", async () => {
            await placeOrderPage.proceedToCheckoutAndOpenAddress();
        });

        await test.step("Verify address, add comment and go to payment page", async () => {
            await placeOrderPage.goToDeliveryAddressAndContinueToPayment();
        });

        await test.step("Enter payment info and confirm order", async () => {
            await paymentPage.fillCardDetails(firstName, lastName);
            await expect(page.locator(".title.text-center")).toHaveText("Order Placed!");
        });

        await test.step('Logout the user', async () => {
            await loginPage.logout();
        });
    });

});
