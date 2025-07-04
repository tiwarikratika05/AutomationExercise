import { expect, test } from '@playwright/test';
import { ProductsPage } from '../pageobjects/ProductsPage'
import { CommonObjects } from '../pageobjects/CommonObjects'
import PRODUCTSDATA from '../test-data/products-test-data.json'


test.describe('As a user, I should be able to access products page', async () => {

    test('Test Case 8: Verify All Products and product detail page',
        async ({ page }) => {
            const products = new ProductsPage(page);
            const commonObjects = new CommonObjects(page);
            await commonObjects.goToWebsite();
            await products.goToProductPage();
            await products.singleProductAccess();
            await products.verifyProductDetails(
                PRODUCTSDATA.productName,
                PRODUCTSDATA.category,
                PRODUCTSDATA.brand
            );
        });

    test.only('Test Case 9: Search Product',
        async ({ page }) => {
            const products = new ProductsPage(page);
            const commonObjects = new CommonObjects(page);
            await commonObjects.goToWebsite();
            await products.goToProductPage();
            await products.searchProduct(PRODUCTSDATA.product);
            await expect(page.getByText("Searched Products")).toBeVisible();
            await products.validSearchedProduct();
        });
});