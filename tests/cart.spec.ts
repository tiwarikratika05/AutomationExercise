import { test } from '@playwright/test';
import { CartPage } from '../pageobjects/CartPage';
import { CommonObjects } from '../pageobjects/CommonObjects';
import { POManager } from '../pageobjects/POManager';
import PRODUCT from '../test-data/cart-test-data.json'

let poManager: POManager;
let cartPage: CartPage;
let commonObjects: CommonObjects;

test.describe('Cart Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        poManager = new POManager(page);
        cartPage = poManager.getCartPage();
        commonObjects = poManager.getCommonObjects();

        await commonObjects.goToWebsite();
    });

    test('Test Case 13: Verify Product quantity in Cart', async () => {
        await test.step('Add first product to cart and continue shopping', async () => {
            await cartPage.goToProductPage();
            await cartPage.addProductToCartByIndex(0);
            await cartPage.clickContinueShopping();
        });

        await test.step('Add second product and view cart', async () => {
            await cartPage.addProductToCartByIndex(1);
            await cartPage.viewCart();
        });

        await test.step('Verify both products are in cart', async () => {
            await cartPage.verifyProductsInCart(2);
        });

        await test.step('Verify price, quantity and total per product', async () => {
            await cartPage.verifyCartDetails();
        });
    });

    test('Test Case 13: Increase quantity to 4 and verify cart total', async () => {
            await test.step('Navigate to product and add to cart', async () => {
              await cartPage.updateProductQuantityAndVerify(PRODUCT.quantity, PRODUCT.name, PRODUCT.unitPrice);
            });
          });
    });

