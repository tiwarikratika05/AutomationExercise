import { Page, Locator } from "@playwright/test";

export class TestCases {
  private page: Page;
  private testCasesLink: Locator;
  private testCasesInfoText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.testCasesLink = page.locator("a[href*='/test_cases']").first();
    this.testCasesInfoText = page.getByText(
      'Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:'
    );
  }

  /**
   * Navigates to the Test Cases page by clicking the respective link.
   */
  async goToTestCasesPage(): Promise<void> {
    await this.testCasesLink.click();
  }

  /**
   * Verifies that the main instruction text on the Test Cases page is visible.
   */
  async verifyTestCasesPageVisible(): Promise<void> {
    await this.testCasesInfoText.scrollIntoViewIfNeeded();
    await this.testCasesInfoText.waitFor({ state: 'visible' });
  }
}
