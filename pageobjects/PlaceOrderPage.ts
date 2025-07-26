import { Page, Locator, expect } from '@playwright/test';

export class PlaceOrderPage {
    page: Page;
    addFirstProduct: Locator;
    viewCart: Locator;
    checkoutButton: Locator;
    signupLink: Locator;
    deliveryAddress: Locator;
    commentBox: Locator;
    proceedToPaymentLink: Locator;
    cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addFirstProduct = page.locator(".btn.btn-default.add-to-cart");
        this.viewCart = page.getByText("View Cart");
        this.checkoutButton = page.getByText("Proceed To Checkout");
        this.signupLink = page.locator("a[href*='/login']");
        this.deliveryAddress = page.locator("#address_delivery");
        this.commentBox = page.locator("textarea[name='message']");
        this.proceedToPaymentLink = page.locator("a[href*='/payment']");
        this.cartLink= page.locator("a[href='/view_cart']");
    }

    /**
     * Adds the first product from the product list to the cart and navigates to the cart page.
     */
    async addFirstProductAndViewCart(): Promise<void> {
        await this.addFirstProduct.first().click();
        await this.viewCart.click();
    }

    /**
     * Proceeds from the cart to the checkout page and navigates to the signup/login page.
     */
    async proceedToCheckoutAndOpenSignup(): Promise<void> {
        await this.checkoutButton.click();
        await this.signupLink.nth(1).click(); 
    }

     /**
     * Proceeds from the cart to the checkout page and navigates to the address page.
     */
      async proceedToCheckoutAndOpenAddress(): Promise<void> {
        await this.cartLink.first().click();
        await this.checkoutButton.click();
    }

    /**
     * Verifies delivery address details (name and phone), enters a comment, and proceeds to payment.
     * @param firstName - Expected first name in the delivery address
     * @param lastName - Expected last name in the delivery address
     * @param phoneNum - Expected phone number in the delivery address
     */
    async verifyDeliveryAddressAndContinueToPayment(firstName: string, lastName: string, phoneNum: string): Promise<void> {
        await expect(this.deliveryAddress.locator(".address_phone").first()).toHaveText(phoneNum);
        await expect(this.deliveryAddress.locator(".address_firstname.address_lastname").first()).toContainText(`${firstName} ${lastName}`);
        await this.commentBox.fill("I am placing order for myself");
        await this.proceedToPaymentLink.click();
    }

     /**
     * Go to delivery address details (name and phone), enters a comment, and proceeds to payment.
     */
      async goToDeliveryAddressAndContinueToPayment(): Promise<void> {
        await this.commentBox.fill("I am placing order for myself");
        await this.proceedToPaymentLink.click();
    }
}

