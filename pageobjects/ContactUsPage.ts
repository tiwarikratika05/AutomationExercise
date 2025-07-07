import { Page, Locator } from "@playwright/test";

export class ContactUs {
    page: Page;
    contactUsBtn: Locator;
    name: Locator;
    email: Locator;
    subject: Locator;
    message: Locator;
    selectFile: Locator;
    submitBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactUsBtn = page.locator("a[href*='/contact_us']");
        this.name = page.locator("input[placeholder='Name']");
        this.email = page.locator("input[placeholder='Email']")
        this.subject = page.locator("input[placeholder='Subject']");
        this.message = page.locator("#message");
        this.selectFile = page.locator("input[name='upload_file']");
        this.submitBtn = page.locator("input[value='Submit']");
    }
    async goToWebsite() {
        await this.page.goto('/')
    }

    async goToContactUsPage() {
        await this.contactUsBtn.click();
    }

    async contactForm(name:string, email:string, subject:string, message:string) {
        await this.name.fill(name);
        await this.email.fill(email);
        await this.subject.fill(subject);
        await this.message.fill(message);
    }

    async submitForm() {
        await this.submitBtn.click();
    }
}

