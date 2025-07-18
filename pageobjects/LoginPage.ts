import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class LoginPage {
    page: Page;
    loginLink: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    logoutLink: Locator;
    userNameLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator("a[href='/login']");
        this.emailInput = page.locator("input[data-qa='login-email']");
        this.passwordInput = page.locator("input[placeholder='Password']");
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.logoutLink = page.locator("a[href='/logout']");
        this.userNameLabel = page.locator("li b");
    }

    /**
     * Navigates to the base URL (homepage).
     */
    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    /**
     * Clicks on the "Login" link to navigate to the login page.
     */
    async goToLoginPage(): Promise<void> {
        await this.loginLink.click();
    }

    /**
     * Logs in a user using the provided email and password.
     * 
     * @param email - The email address to use for login.
     * @param password - The password to use for login.
     */
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Logs out the currently logged-in user.
     */
    async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    /**
     * Generates random email and password using `faker` for negative test cases.
     * 
     * @returns A Promise resolving to an object containing random email and password.
     */
    async getRandomCredentials(): Promise<{ email: string; password: string }> {
        return {
            email: faker.internet.email(),
            password: faker.internet.password(),
        };
    }

    /**
     * Checks if the user is logged in by verifying the displayed username.
     * 
     * @param expectedName - The expected username that should appear in the UI.
     * @returns A Promise resolving to `true` if the expected name matches; otherwise, `false`.
     */
    async isUserLoggedIn(expectedName: string): Promise<boolean> {
        return await this.userNameLabel.textContent() === expectedName;
    }
}
