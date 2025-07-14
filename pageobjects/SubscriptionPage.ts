import { Page, Locator, expect } from "@playwright/test";

export class SubscriptionPage {
  private page: Page;
  private footerSection: Locator;
  private subscriptionBox: Locator;
  private subscriptionSubmit: Locator;
  private cartLink: Locator;
  private successAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.footerSection = page.locator('#footer');
    this.subscriptionBox = page.locator("#susbscribe_email");
    this.subscriptionSubmit = page.locator("#subscribe"); // fixed correct ID
    this.cartLink = page.getByRole('link', { name: ' Cart' });
    this.successAlert = page.locator("#success-subscribe");
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
}
