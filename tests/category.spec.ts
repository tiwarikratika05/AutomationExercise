import { test, expect } from '@playwright/test'
import { POManager } from '../pageobjects/POManager';
import { CommonObjects } from '../pageobjects/CommonObjects';

let poManager: POManager;
let commonObjects: CommonObjects;

test.describe('Category Page Tests', () => {
    test.beforeEach('Preconditions: Launch site and setup pages', async ({ page }) => {
        poManager = new POManager(page);
        commonObjects = poManager.getCommonObjects();

        await test.step('Launch browser and navigate to AutomationExercise site', async () => {
            await commonObjects.goToWebsite();
            await expect(page).toHaveURL("https://www.automationexercise.com/");
        });
    });


    test('Test Case 18: View Category Products', async ({ page }) => {

        await test.step('Verify that categories are visible on left side bar', async () => {
            await expect(page.getByText('Category')).toBeVisible();
        });

        await test.step('Verify User navigate to women subcategory', async () => {
            const expectedText = "Women - Dress Products"
            await page.locator("[href='#Women']").click();
            await page.locator("a[href='/category_products/1']").click();
            const actualText = await page.locator(".title.text-center").textContent();
            expect(actualText).toBe(expectedText);
        });
        await test.step('Verify User navigate to men subcategory', async () => {
            const expectedText = "Men - Tshirts Products"
            await page.locator("[href='#Men']").click();
            await page.locator("a[href='/category_products/3']").click();
            const actualText = await page.locator(".title.text-center").textContent();
            expect(actualText).toBe(expectedText);
        });
    });

});
