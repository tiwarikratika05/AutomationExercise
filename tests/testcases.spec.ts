import { test } from '@playwright/test';
import { TestCasesPage } from '../pageobjects/TestCasesPage';
import { CommonObjects } from '../pageobjects/CommonObjects';

let testCases: TestCasesPage;
let commonObjects: CommonObjects;

test.describe('As a user, I should be able to access TestCases page', () => {

  test.beforeEach(async ({ page }) => {
    testCases = new TestCasesPage(page);
    commonObjects = new CommonObjects(page);
    await commonObjects.goToWebsite();
  });

  test('Test Case 7: Verify Test Cases Page', async () => {
    await testCases.goToTestCasesPage();
    await testCases.verifyTestCasesPageVisible();
  });

});
