import { test } from '@playwright/test';
import { TestCases } from '../pageobjects/TestCasesPage';
import { CommonObjects } from '../pageobjects/CommonObjects';

let testCases: TestCases;
let commonObjects: CommonObjects;

test.describe('As a user, I should be able to access TestCases page', () => {

  test.beforeEach(async ({ page }) => {
    testCases = new TestCases(page);
    commonObjects = new CommonObjects(page);
    await commonObjects.goToWebsite();
  });

  test('Test Case 7: Verify Test Cases Page', async () => {
    await testCases.goToTestCasesPage();
    await testCases.verifyTestCasesPageVisible();
  });

});
