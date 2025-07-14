import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pageobjects/ProductsPage';
import { CommonObjects } from '../pageobjects/CommonObjects';
import PRODUCTSDATA from '../test-data/products-test-data.json';
let products: ProductsPage;
let common: CommonObjects;

test.describe('Products Page Test Suite', () => {

    test.beforeEach('Open website and navigate to products page', async ({ page }) => {
        products = new ProductsPage(page);
        common = new CommonObjects(page);

        await common.goToWebsite();
        await products.goToProductPage();
    });
    test('Test Case 8: Verify all products and product detail page', async ({ page }) => {
        await test.step('Open product detail page and verify info', async () => {
            await products.openFirstProductDetail();
            await products.verifyProductDetails(
                PRODUCTSDATA.productName,
                PRODUCTSDATA.category,
                PRODUCTSDATA.brand
            );
        });
    });

    test('Test Case 9: Search Product (Positive)', async ({ page }) => {
        await test.step(`Search for valid product "${PRODUCTSDATA.product}"`, async () => {
            await products.searchProduct(PRODUCTSDATA.product);
            await expect(page.getByText('Searched Products')).toBeVisible();
            await products.assertValidSearchResults();
        });
    });

    test('Test Case 10: Search Product (Negative)', async ({ page }) => {

        const invalidTerm = 'invalidSearchText!@#';
        await test.step(`Search for invalid product "${invalidTerm}"`, async () => {
            await products.searchProduct(invalidTerm);
        });

        await test.step('Assert that no search results are displayed', async () => {
            await expect(products.searchResults).toHaveCount(0);
            await expect(page.locator('.productinfo.text-center p')).toHaveCount(0);
        });
    });
});
