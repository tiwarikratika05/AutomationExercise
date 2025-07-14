import { Page, Locator, expect } from '@playwright/test';

export class CommonObjects {
  private page: Page;
  private homeLogo: Locator;
  private footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLogo = page.locator('a > img[alt="Website for automation practice"]');
    this.footer = page.locator('footer');
  }

  /**
   * Navigates to the base URL.
   */
  async goToWebsite(): Promise<void> {
    await this.page.goto('/');
    await expect(this.homeLogo).toBeVisible(); // verifies landing
  }

  /**
   * Scrolls to the footer section of the page.
   */
  async scrollToFooter(): Promise<void> {
    await this.footer.scrollIntoViewIfNeeded();
    await expect(this.footer).toBeVisible();
  }

  /**
   * Verifies if home page loaded correctly (used for sanity).
   */
  async verifyHomePage(): Promise<void> {
    await expect(this.homeLogo).toBeVisible();
  }
}
