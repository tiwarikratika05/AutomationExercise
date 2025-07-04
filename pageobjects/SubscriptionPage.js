export class SubscriptionPage {
    constructor(page) {
        this.page = page;
        this.footerSection = page.locator('#footer');
        this.subscriptionBox = page.locator("#susbscribe_email");
        this.subscriptionSubmit = page.locator("#susbscribe_email");
        this.successMsg = page.locator("#success-subscribe");
        this.cart = page.getByRole('link', { name: ' Cart' });

    }
    async goToCartPage() {
        await this.cart.click();
    }
    async subscribeWebsite(email) {
        await this.footerSection.scrollIntoViewIfNeeded();
        await this.subscriptionBox.fill(email);
        await this.subscriptionSubmit.click();
    }

}


