import { expect } from '@playwright/test';

export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productBtn = page.locator("a[href='/products']");
        this.firstProduct = page.locator("a[href='/product_details/1']");
        this.productName = page.locator('.product-information h2');
        this.category = page.locator('.product-information p').first();
        this.brand = page.locator('.product-information p').last();
        this.searchBox = page.locator("#search_product");
        this.searchSubmitIcon = page.locator("#submit_search");
        this.searchResults = page.locator('.productinfo.text-center p');
    }

    async goToProductPage() {
        await this.productBtn.click();
    }

    async singleProductAccess() {
        await this.firstProduct.click();

    }

    async verifyProductDetails(expectedName, expectedCategory, expectedBrand) {
        await expect(this.productName).toHaveText(expectedName);
        await expect(this.category).toHaveText(expectedCategory);
        await expect(this.brand).toContainText(expectedBrand);
    }

    async searchProduct(productName){
        await this.searchBox.fill(productName);
        await this.searchSubmitIcon.click();
    }

    async validSearchedProduct(){
        const count = await this.searchResults.count();
        expect(count).toBeGreaterThan(0);    
    }
}
