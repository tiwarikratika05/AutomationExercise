import { Page } from "@playwright/test";
export class CommonObjects {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goToWebsite() {
        await this.page.goto('/')
    }
}