import { Q } from '@faker-js/faker/dist/airline-CLphikKp';
import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    page: Page;
    productScreen: Locator;
    productCards: Locator;
    productOverlays: Locator;
    continueShoppingButton: Locator;
    viewCartLink: Locator;
    cartTableRows: Locator;
    firstProductLink: Locator;
    productQty: Locator;
    addToCartBtn: Locator;
    productRow: Locator;


    /**
     * Initializes the page and locators for Cart-related interactions.
     * @param page - The Playwright Page object.
     */
    constructor(page: Page) {
        this.page = page;
        this.productScreen = page.locator('a[href="/products"]')
        this.productCards = page.locator('.features_items .col-sm-4');
        this.productOverlays = page.locator('.features_items .product-overlay');
        this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
        this.viewCartLink = page.locator('u:has-text("View Cart")');
        this.cartTableRows = page.locator('#cart_info_table tbody tr');
        this.firstProductLink = page.locator('.fa.fa-plus-square');
        this.productQty = page.locator('input#quantity');
        this.addToCartBtn = page.locator("button[type='button']");
        this.productRow = page.locator('tr#product-1');
    }

    /**
     * Navigates to the Product Listing Page.
     */
    async goToProductPage(): Promise<void> {
        await this.productScreen.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Adds a product to the cart based on its index (0-based) in the product list.
     * @param index - Index of the product to add (0 = first product).
     */
    async addProductToCartByIndex(index: number): Promise<void> {
        await this.productCards.nth(index).hover();
        await this.productOverlays.nth(index).locator('a:has-text("Add to cart")').click();
    }

    /**
     * Clicks the "Continue Shopping" button in the add-to-cart modal.
     */
    async clickContinueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    /**
     * Clicks the "View Cart" link to navigate to the cart page.
     */
    async viewCart(): Promise<void> {
        await this.viewCartLink.click();
    }

    /**
     * Verifies that the number of products added to the cart matches the expected count.
     * @param count - Expected number of products in the cart.
     */
    async verifyProductsInCart(count: number): Promise<void> {
        await expect(this.cartTableRows).toHaveCount(count);
    }

    /**
     * Verifies that each product's total price = unit price × quantity.
     * Fails the test if any mismatch is found.
     */
    async verifyCartDetails(): Promise<void> {
        const rows = this.cartTableRows;
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const priceText = await rows.nth(i).locator('.cart_price p').innerText();
            const qtyText = await rows.nth(i).locator('.cart_quantity button').innerText();
            const totalText = await rows.nth(i).locator('.cart_total p').innerText();

            const price = parseInt(priceText.replace(/\D/g, ''));
            const qty = parseInt(qtyText);
            const total = parseInt(totalText.replace(/\D/g, ''));

            expect(price * qty).toBe(total);
        }
    }

    /**
   * Increases the quantity of the first product to the given amount and verifies total.
   * @param quantity - The desired quantity (e.g., 4)
   * @param expectedProductName - Product name to verify in cart (e.g., 'Blue Top')
   * @param expectedTotal - Expected total price (e.g., 'Rs. 2000')
   */
    async updateProductQuantityAndVerify(quantity: string, expectedProductName: string, expectedTotal: string): Promise<void> {
        await this.firstProductLink.first().click();
        await this.productQty.fill('');
        await this.productQty.fill(quantity);
        await this.addToCartBtn.click();
        await this.viewCart();

        await expect(this.productRow).toContainText(expectedProductName);

        const quantityLocator = this.productRow.locator('td.cart_quantity >> button.disabled');
        await expect(quantityLocator).toHaveText(quantity.toString());

        const totalLocator = this.productRow.locator('td.cart_total >> p.cart_total_price');
        await expect(totalLocator).toHaveText(expectedTotal);
    }
}
