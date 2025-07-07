import { Page, Locator } from "@playwright/test";

export class SubscriptionPage {
    page: Page;
    footerSection: Locator;
    subscriptionBox: Locator;
    subscriptionSubmit: Locator;
    cart: Locator;
    constructor(page: Page) {
        this.page = page;
        this.footerSection = page.locator('#footer');
        this.subscriptionBox = page.locator("#susbscribe_email");
        this.subscriptionSubmit = page.locator("#susbscribe_email");
        this.cart = page.getByRole('link', { name: ' Cart' });

    }
    async goToCartPage() {
        await this.cart.click();
    }
    async subscribeWebsite(email:string) {
        await this.footerSection.scrollIntoViewIfNeeded();
        await this.subscriptionBox.fill(email);
        await this.subscriptionSubmit.click();
    }

}


