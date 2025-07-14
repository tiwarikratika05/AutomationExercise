import { expect, Page, Locator } from '@playwright/test';

export class ProductsPage {
  private page: Page;
  private productBtn: Locator;
  private firstProduct: Locator;
  private productName: Locator;
  private category: Locator;
  private brand: Locator;
  private searchBox: Locator;
  private searchSubmitIcon: Locator;
  public searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productBtn = page.locator("a[href='/products']");
    this.firstProduct = page.locator("a[href='/product_details/1']");
    this.productName = page.locator('.product-information h2');
    this.category = page.locator('.product-information p').first();
    this.brand = page.locator('.product-information p').last();
    this.searchBox = page.locator('#search_product');
    this.searchSubmitIcon = page.locator('#submit_search');
    this.searchResults = page.locator('.productinfo.text-center p');
  }

  /**
   * Navigates to the Products page by clicking the product button.
   */
  async goToProductPage(): Promise<void> {
    await this.productBtn.click();
  }

  /**
   * Opens the detail page of the first product listed.
   */
  async openFirstProductDetail(): Promise<void> {
    await this.firstProduct.click();
  }

  /**
   * Verifies product detail information such as name, category, and brand.
   * 
   * @param expectedName - The expected product name.
   * @param expectedCategory - The expected category text.
   * @param expectedBrand - The expected brand text.
   */
  async verifyProductDetails(expectedName: string, expectedCategory: string, expectedBrand: string): Promise<void> {
    await expect(this.productName).toHaveText(expectedName);
    await expect(this.category).toHaveText(expectedCategory);
    await expect(this.brand).toContainText(expectedBrand);
  }

  /**
   * Searches for a product using the search box.
   * 
   * @param productName - The product name or keyword to search for.
   */
  async searchProduct(productName: string): Promise<void> {
    await this.searchBox.fill(productName);
    await this.searchSubmitIcon.click();
  }

  /**
   * Asserts that at least one search result is returned for the query.
   */
  async assertValidSearchResults(): Promise<void> {
    const count = await this.searchResults.count();
    expect(count).toBeGreaterThan(0);
  }
}
