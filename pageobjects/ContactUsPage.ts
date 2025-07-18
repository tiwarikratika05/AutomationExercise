import { Page, Locator } from "@playwright/test";

export class ContactUs {
    page: Page;
    contactUsLink: Locator;
    nameInput: Locator;
    emailInput: Locator;
    subjectInput: Locator;
    messageTextarea: Locator;
    fileUploadInput: Locator;
    submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactUsLink = page.locator("a[href*='/contact_us']");
        this.nameInput = page.locator("input[placeholder='Name']");
        this.emailInput = page.locator("input[placeholder='Email']");
        this.subjectInput = page.locator("input[placeholder='Subject']");
        this.messageTextarea = page.locator("#message");
        this.fileUploadInput = page.locator("input[name='upload_file']");
        this.submitButton = page.locator("input[value='Submit']");
    }

    /**
     * Navigates to the base website URL set in Playwright config.
     */
    async goToWebsite(): Promise<void> {
        await this.page.goto('/');
    }

    /**
     * Clicks the "Contact Us" link to navigate to the contact form page.
     */
    async navigateToContactForm(): Promise<void> {
        await this.contactUsLink.click();
    }

    /**
     * Fills the contact form with provided user data.
     * @param name - Full name of the user
     * @param email - Email address of the user
     * @param subject - Subject of the message
     * @param message - Main body of the message
     */
    async fillContactForm(name: string, email: string, subject: string, message: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageTextarea.fill(message);
    }

    /**
     * Uploads a file to the contact form (if required).
     * @param filePath - Relative path to the file within the project directory
     */
    async uploadFile(filePath: string): Promise<void> {
        await this.fileUploadInput.setInputFiles(filePath);
    }

    /**
     * Submits the contact form by clicking the submit button.
     */
    async submitContactForm(): Promise<void> {
        await this.submitButton.click();
    }
}