import { faker } from "@faker-js/faker";
import { Page, Locator } from "@playwright/test";

export class SignupPage {
    page: Page;
    signupPageLink: Locator;
    name: Locator;
    email: Locator;
    signupBtn: Locator;
    genderBtn: Locator;
    password: Locator;
    days: Locator;
    months: Locator;
    years: Locator;
    firstName: Locator;
    lastName: Locator;
    company: Locator;
    address1: Locator;
    address2: Locator;
    country: Locator;
    state: Locator;
    city: Locator;
    zipcode: Locator;
    mobile: Locator;
    createAccountBtn: Locator;
    continueBtn: Locator;
    deleteAccountLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupPageLink = page.locator("a[href='/login']");
        this.name = page.locator("input[placeholder='Name']");
        this.email = page.locator("input[data-qa='signup-email']");
        this.signupBtn = page.getByRole("button", { name: "Signup" });
        this.genderBtn = page.locator("#id_gender2");
        this.password = page.locator("#password");
        this.days = page.locator("#days");
        this.months = page.locator("#months");
        this.years = page.locator("#years");
        this.firstName = page.locator("#first_name");
        this.lastName = page.locator("#last_name");
        this.company = page.locator("#company");
        this.address1 = page.locator("#address1");
        this.address2 = page.locator("#address2");
        this.country = page.locator("#country");
        this.state = page.locator("#state");
        this.city = page.locator("#city");
        this.zipcode = page.locator("#zipcode");
        this.mobile = page.locator("#mobile_number");
        this.createAccountBtn = page.getByRole("button", { name: "Create Account" });
        this.continueBtn = page.locator(".btn.btn-primary");
        this.deleteAccountLink = page.locator("a[href*='/delete_account']");
    }

    /**
     * Navigates to the home/signup page.
     */
    async goToSignupPage(): Promise<void> {
        await this.page.goto("https://www.automationexercise.com/");
    }

    /**
 * Fills and submits the signup form using either provided or dynamically generated data.
 *
 * - If `name` and `email` are passed as arguments, they will be used.
 * - If not provided, the method uses `faker` to generate a random name and email.
 * - After filling, it clicks the Signup button to proceed.
 *
 * @param name - (Optional) Name to use in the signup form. If not provided, a random first name will be generated using faker.
 * @param email - (Optional) Email address to use in the signup form. If not provided, an email will be generated using the random or passed name.
 *
 * @returns An object containing the `name` and `email` used in the form, which can be used for assertions in tests.
 */
async fillSignupForm(name?: string, email?: string): Promise<{ name: string; email: string }> {
    await this.signupPageLink.click();
    const randomName = name || faker.person.firstName();
    const randomEmail = email || faker.internet.email({ firstName: randomName });
  
    await this.name.fill(randomName);
    await this.email.fill(randomEmail);
    await this.signupBtn.click();
  
    return { name: randomName, email: randomEmail };
  }

    /**
     * Completes the create account form with faker-generated data.
     */
    async fillCreateAccountForm(): Promise<void> {
        await this.genderBtn.click();
        await this.password.fill("Test123");

        await this.days.selectOption("5");
        await this.months.selectOption("May");
        await this.years.selectOption("1995");

        await this.firstName.fill(faker.person.firstName());
        await this.lastName.fill(faker.person.lastName());
        await this.company.fill(faker.company.name());
        await this.address1.fill(faker.location.streetAddress());
        await this.address2.fill(faker.location.secondaryAddress());
        await this.country.selectOption("India");
        await this.state.fill(faker.location.state());
        await this.city.fill(faker.location.city());
        await this.zipcode.fill(faker.location.zipCode());
        await this.mobile.fill(faker.phone.number());

        await this.createAccountBtn.click();
    }

    /**
     * Clicks on the "Continue" button after successful account creation.
     */
    async clickContinue(): Promise<void> {
        await this.continueBtn.click();
    }

    /**
     * Deletes the currently logged-in account.
     */
    async deleteAccount(): Promise<void> {
        await this.deleteAccountLink.click();
    }

    /**
     * Tries to sign up with an existing account (used for negative testing).
     * @param existingName Name of existing user.
     * @param existingEmail Email of existing user.
     */
    async signupWithExistingAccount(existingName: string, existingEmail: string): Promise<void> {
        await this.signupPageLink.click();
        await this.name.fill(existingName);
        await this.email.fill(existingEmail);
        await this.signupBtn.click();
    }
}
