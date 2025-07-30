import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';
import { CommonObjects } from '../pageobjects/CommonObjects';
import { ProductsPage } from '../pageobjects/ProductsPage';
import { CategoryPage } from '../pageobjects/CategoryPage';
import CATEGORY from '../test-data/category-test-data.json';

let poManager: POManager;
let commonObjects: CommonObjects;
let productsPage: ProductsPage;
let categoryPage: CategoryPage;

test.describe('Category Page Tests', () => {
  test.beforeEach('Preconditions: Launch site and setup pages', async ({ page }) => {
    poManager = new POManager(page);
    commonObjects = poManager.getCommonObjects();
    productsPage = poManager.getProductsPage();
    categoryPage = poManager.getCategoryPage();

    await test.step('Launch browser and navigate to AutomationExercise site', async () => {
      await commonObjects.goToWebsite();
      await expect(page).toHaveURL('https://www.automationexercise.com/');
    });
  });

  test('Test Case 18: View Category Products', async () => {
    await test.step('Verify that categories are visible on left side bar', async () => {
      await expect(categoryPage.page.getByText('Category')).toBeVisible();
    });

    await test.step('Navigate to Women > Dress category and verify title', async () => {
      await categoryPage.navigateToWomenDressCategory();
      const actualTitle = await categoryPage.getPageTitleText();
      expect(actualTitle).toBe(CATEGORY.womenCategory);
    });

    await test.step('Navigate to Men > Tshirt category and verify title', async () => {
      await categoryPage.navigateToMenTshirtCategory();
      const actualTitle = await categoryPage.getPageTitleText();
      expect(actualTitle).toBe(CATEGORY.menCategory);
    });
  });

  test('Test Case 19: View & Cart Brand Products', async () => {
    await test.step('Go to Products page and verify brands text is visible', async () => {
      await productsPage.goToProductPage();
      await expect(productsPage.page.getByText('Brands')).toBeVisible();
    });

    await test.step('Navigate to Polo brand and verify title', async () => {
      await categoryPage.navigateToPoloBrand();
      await categoryPage.assertPageTitleEquals(CATEGORY.poloBrand);
    });

    await test.step('Navigate to H&M brand and verify title', async () => {
      await categoryPage.navigateToHAndMBrand();
      await categoryPage.assertPageTitleEquals(CATEGORY["H&MBrand"]);
    });
  });
});
