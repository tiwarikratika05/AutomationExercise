import { test, expect } from '@playwright/test';
import { SubscriptionPage } from '../pageobjects/SubscriptionPage'
import { CommonObjects } from '../pageobjects/CommonObjects'
import SUBSCRIBE from '../test-data/subscription-test-data.json'

test.describe('As a user, I should be able to access subscription section in the page', async () => {

    test('Test Case 10: Verify Subscription in home page',
        async ({ page }) => {
            const subscribe = new SubscriptionPage(page);
            const commonObjects = new CommonObjects(page);
            await commonObjects.goToWebsite();
            await subscribe.subscribeWebsite(SUBSCRIBE.email)
           
            const alert = page.locator("#success-subscribe");

            //  Verify alert appears
            await expect(alert).toBeVisible();

            //  Verify the message content
            await expect(alert).toHaveText('You have been successfully subscribed!');

            // Verify alert disappears after a few seconds (optional)
            await expect(alert).toBeHidden();
        });

        test.only('Test Case 11: Verify Subscription in Cart page',
        async ({ page }) => {
            const subscribe = new SubscriptionPage(page);
            const commonObjects = new CommonObjects(page);
            await commonObjects.goToWebsite();
            await  subscribe.goToCartPage();
            await subscribe.subscribeWebsite(SUBSCRIBE.email)

            const alert = page.locator("#success-subscribe");

            //  Verify alert appears
            await expect(alert).toBeVisible();

            //  Verify the message content
            await expect(alert).toHaveText('You have been successfully subscribed!');
        });


});