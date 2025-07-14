import { test, expect } from '@playwright/test';
import path from 'path';
import { ContactUs } from '../pageobjects/ContactUsPage';
import CONTACTDATA from '../test-data/contactUs-test-data.json';

test.describe('Contact Us Page Tests', () => {

    test('Test Case 6: Submit Contact Us Form with File Upload', async ({ page }) => {
        const contactUsPage = new ContactUs(page);
        const filePath = path.join(__dirname, '../framefile.rtf');

        await test.step('Navigate to the homepage and go to Contact Us page', async () => {
            await contactUsPage.goToWebsite();
            await contactUsPage.navigateToContactForm();
            await expect(page.getByText('Get In Touch')).toBeVisible();
        });

        await test.step('Fill out the contact form', async () => {
            await contactUsPage.fillContactForm(
                CONTACTDATA.name,
                CONTACTDATA.email,
                CONTACTDATA.subject,
                CONTACTDATA.message
            );
        });

        await test.step('Upload file', async () => {
            await contactUsPage.uploadFile(filePath);
        });

        await test.step('Handle dialog popup and submit the form', async () => {
            page.once('dialog', async dialog => {
                await dialog.accept();
            });
            await contactUsPage.submitContactForm();
        });

    });

});
