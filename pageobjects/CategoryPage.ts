import { Page, Locator, expect } from '@playwright/test';

export class CategoryPage {
    readonly page: Page;

    // === Category Locators ===
    womenCategoryLink: Locator;
    menCategoryLink: Locator;
    dressSubCategoryLink: Locator;
    tshirtSubCategoryLink: Locator;

    // === Brand Locators ===
    poloBrandLink: Locator;
    hAndMBrandLink: Locator;

    // === Common Locators ===
    pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.womenCategoryLink = page.locator("[href='#Women']");
        this.dressSubCategoryLink = page.locator("a[href='/category_products/1']");
        this.menCategoryLink = page.locator("[href='#Men']");
        this.tshirtSubCategoryLink = page.locator("a[href='/category_products/3']");
        this.poloBrandLink = page.locator("a[href='/brand_products/Polo']");
        this.hAndMBrandLink = page.locator("a[href='/brand_products/H&M']");
        this.pageTitle = page.locator(".title.text-center");
    }

    /**
     * Navigates to the Women's Category and selects the Dress sub-category.
     */
    async navigateToWomenDressCategory(): Promise<void> {
        await this.womenCategoryLink.click();
        await this.dressSubCategoryLink.click();
    }

    /**
     * Navigates to the Men's Category and selects the T-shirt sub-category.
     */
    async navigateToMenTshirtCategory(): Promise<void> {
        await this.menCategoryLink.click();
        await this.tshirtSubCategoryLink.click();
    }

    /**
     * Verifies the page title content matches the expected category or brand name.
     * @returns {Promise<string | null>} The actual title text.
     */
    async getPageTitleText(): Promise<string | null> {
        return await this.pageTitle.textContent();
    }

    /**
     * Clicks on the 'Polo' brand link from the brand list.
     */
    async navigateToPoloBrand(): Promise<void> {
        await this.poloBrandLink.click();
    }

    /**
     * Clicks on the 'H&M' brand link from the brand list.
     */
    async navigateToHAndMBrand(): Promise<void> {
        await this.hAndMBrandLink.click();
    }

    /**
     * Asserts that the page title matches the expected brand/category name.
     * @param expectedTitle The expected text to appear in the page title.
     */
    async assertPageTitleEquals(expectedTitle: string): Promise<void> {
        await expect(this.pageTitle).toHaveText(expectedTitle);
    }
}
