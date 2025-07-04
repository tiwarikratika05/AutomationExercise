export class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginPage = page.locator("a[href='/login']");
        this.email = page.locator("input[data-qa='login-email']");
        this.password = page.locator("input[placeholder='Password']")
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.logoutBtn = page.locator("a[href='/logout']");
    }
    async goToWebsite(){
        await this.page.goto('/')
    }
    async goToLoginPage() {
        await this.loginPage.click();
    }

    async login(email,password) {
        await this.email.fill(email);
        await this.password.fill(password)
        await this.loginBtn.click();
    }

    async logout(){
        await this.logoutBtn.click();
    }
}

