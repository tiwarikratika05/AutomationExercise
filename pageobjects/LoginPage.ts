import { Page, Locator } from "@playwright/test";

export class LoginPage {
    page: Page;
    loginPage: Locator;
    email: Locator;
    password: Locator;
    loginBtn: Locator;
    logoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = page.locator("a[href='/login']");
        this.email = page.locator("input[data-qa='login-email']");
        this.password = page.locator("input[placeholder='Password']")
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.logoutBtn = page.locator("a[href='/logout']");
    }
    async goToWebsite() {
        await this.page.goto('/')
    }
    async goToLoginPage() {
        await this.loginPage.click();
    }

    async login(email:string, password:string) {
        await this.email.fill(email);
        await this.password.fill(password)
        await this.loginBtn.click();
    }

    async logout() {
        await this.logoutBtn.click();
    }
}

