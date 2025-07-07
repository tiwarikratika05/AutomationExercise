import { test, expect } from '@playwright/test';
import path from 'path';
import { ContactUs } from '../pageobjects/ContactUsPage'
import CONTACTDATA from '../test-data/contactUs-test-data.json'

test.describe('As a user, I should be able to access contact us page', async () => {

    test('Test Case 6: Contact Us Form',
        async ({ page }) => {
            const contactPage = new ContactUs(page);
            await contactPage.goToWebsite();
            await contactPage.goToContactUsPage();
            await expect(page.getByText('Get In Touch')).toBeVisible()
            await contactPage.contactForm(CONTACTDATA.name, CONTACTDATA.email, CONTACTDATA.subject, CONTACTDATA.message);
            await page.locator("input[name='upload_file']").setInputFiles(path.join(__dirname, '../framefile.rtf'));
            page.once('dialog', async dialog => {
                await dialog.accept();
            });
            await contactPage.submitForm();   
        });

});