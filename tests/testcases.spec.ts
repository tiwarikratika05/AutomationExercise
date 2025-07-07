import { test, expect } from '@playwright/test';
import { TestCases } from '../pageobjects/TestCasesPage'
import { CommonObjects } from '../pageobjects/CommonObjects'


test.describe('As a user, I should be able to login in the page', async () => {

    test('Test Case 7: Verify Test Cases Page',
        async ({ page }) => {
            const testcase = new TestCases(page);
            const commonObjects = new CommonObjects(page);
            await commonObjects.goToWebsite();
            await testcase.goToTestCasesPage();
            await page.pause();
            await expect(page.getByText('Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:')).toBeVisible()

        });
});