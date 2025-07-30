import { test } from '@playwright/test';
import { SubscriptionPage } from '../pageobjects/SubscriptionPage';
import { CommonObjects } from '../pageobjects/CommonObjects';
import SUBSCRIBE from '../test-data/subscription-test-data.json';

let subscribe: SubscriptionPage;
let commonObjects: CommonObjects;

test.describe('As a user, I should be able to access subscription section in the page', () => {

  test.beforeEach(async ({ page }) => {
    subscribe = new SubscriptionPage(page);
    commonObjects = new CommonObjects(page);
    await commonObjects.goToWebsite();
  });

  test('Test Case 10: Verify Subscription in Home Page', async () => {
    await subscribe.subscribeToNewsletter(SUBSCRIBE.email);
    await subscribe.verifySubscriptionSuccess(true);
  });

  test('Test Case 11: Verify Subscription in Cart Page', async () => {
    await subscribe.goToCartPage();
    await subscribe.subscribeToNewsletter(SUBSCRIBE.email);
    await subscribe.verifySubscriptionSuccess();
  });

  test('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality', async ({ page }) => {
    await subscribe.verifyScrollUpAndDownUsingArrow();

  });

  test('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', async ({ page }) => {
    await subscribe.verifyScrollUpAndDown();
  });
});

