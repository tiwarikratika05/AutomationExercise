import { Page, Locator } from "@playwright/test";

export class SignupPage {
    page: Page;
    signupPageLink: Locator;
    name: Locator;
    email: Locator;
    signupBtn: Locator;
    genderbtn: Locator;
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
    creatAccount: Locator;
    continue: Locator;
    deleteaccount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupPageLink = page.locator("a[href='/login']");
        this.name = page.locator("input[placeholder='Name']");
        this.email = page.locator("input[data-qa='signup-email']");
        this.signupBtn = page.getByRole('button', { name: 'Signup' });
        this.genderbtn = page.locator("#id_gender2");
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
        this.creatAccount = page.getByRole('button', { name: 'Create Account' })
        this.continue = page.locator(".btn.btn-primary");
        this.deleteaccount = page.locator("a[href*='/delete_account']");
    }

    async goToSignupPage() {
        await this.page.goto("https://www.automationexercise.com/");
    }

    async singUpForm(name:string,email:string) {
        await this.signupPageLink.click();
        await this.name.fill("kratika");
        await this.email.fill("amanTest3@gmail.com")
        await this.signupBtn.click();
    }

    async createAccountForm() {
        await this.genderbtn.click();
        await this.password.fill("Test123");
        await this.days.selectOption("5");
        await this.months.selectOption("May");
        await this.years.selectOption("1995");
        await this.firstName.fill("qa");
        await this.lastName.fill("test");
        await this.company.fill("mycompany");
        await this.address1.fill("street");
        await this.address2.fill("street");
        await this.country.selectOption("India");

        await this.state.fill("rajasthan");
        await this.city.fill("street");
        await this.zipcode.fill("12345");

        await this.mobile.fill("82737007877");
        await this.creatAccount.click();
    }

    async accountCreationScreen() {
        await this.continue.click();

    }

    async deleteAccountScreen() {
        await this.deleteaccount.click();
    }

    async alreadyExistAccount(existName:string,existEmail:string) {
        await this.signupPageLink.click();
        await this.name.fill(existName);
        await this.email.fill(existEmail);
        await this.signupBtn.click();
    }
}

