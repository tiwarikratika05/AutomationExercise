import { Page, Locator, expect } from "@playwright/test";

export class SubscriptionPage {
    page: Page;
    footerSection: Locator;
    subscriptionBox: Locator;
    subscriptionSubmit: Locator;
    cartLink: Locator;
    successAlert: Locator;
    subscriptionTitle: Locator;
    homePageText: Locator;
    scrollUpArrow: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footerSection = page.locator('#footer');
        this.subscriptionBox = page.locator("#susbscribe_email");
        this.subscriptionSubmit = page.locator("#subscribe");
        this.cartLink = page.getByRole('link', { name: ' Cart' });
        this.successAlert = page.locator("#success-subscribe");
        this.subscriptionTitle = page.locator("div[class='single-widget'] h2");
        this.homePageText = page.locator("div[class='item active'] div[class='col-sm-6'] h2");
        this.scrollUpArrow = page.locator("#scrollUp")
    }

    /**
     * Navigates to the cart page.
     */
    async goToCartPage(): Promise<void> {
        await this.cartLink.click();
    }

    /**
     * Scrolls to the footer and subscribes to the newsletter using the provided email.
     * @param email - The email address to subscribe with.
     */
    async subscribeToNewsletter(email: string): Promise<void> {
        await this.footerSection.scrollIntoViewIfNeeded();
        await this.subscriptionBox.fill(email);
        await this.subscriptionSubmit.click();
    }

    /**
     * Verifies the success alert message and optionally checks its disappearance.
     * @param shouldAutoDisappear - Whether the alert should disappear after a few seconds.
     */
    async verifySubscriptionSuccess(shouldAutoDisappear: boolean = false): Promise<void> {
        await expect(this.successAlert).toBeVisible();
        await expect(this.successAlert).toHaveText('You have been successfully subscribed!');
        if (shouldAutoDisappear) {
            await expect(this.successAlert).toBeHidden({ timeout: 5000 }); // optional wait
        }
    }

    /**
     * Verifies the user able to scroll up and down using arrow the website page
     */
    async verifyScrollUpAndDownUsingArrow(): Promise<void> {
        await this.footerSection.scrollIntoViewIfNeeded();
        await expect(this.subscriptionTitle).toHaveText("Subscription");
        await this.scrollUpArrow.click();
        await expect(this.homePageText).toHaveText("Full-Fledged practice website for Automation Engineers");
    }

     /**
     * Verifies the user able to scroll up and down without arrow the website page
     */
      async verifyScrollUpAndDown(): Promise<void> {
        await this.footerSection.scrollIntoViewIfNeeded();
        await expect(this.subscriptionTitle).toHaveText("Subscription");
        await this.page.mouse.up();
        await expect(this.homePageText).toHaveText("Full-Fledged practice website for Automation Engineers");
    }
}

