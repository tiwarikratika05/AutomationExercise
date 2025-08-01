import { Page } from "@playwright/test";
import { CommonObjects } from '../pageobjects/CommonObjects';
import { LoginPage } from '../pageobjects/LoginPage';
import { ContactUs } from '../pageobjects/ContactUsPage';
import { ProductsPage } from '../pageobjects/ProductsPage';
import { SignupPage } from '../pageobjects/SignupPage';
import { SubscriptionPage } from '../pageobjects/SubscriptionPage';
import { TestCasesPage } from '../pageobjects/TestCasesPage';
import { CartPage } from '../pageobjects/CartPage';
import { PaymentPage } from "./PaymentPage";
import { PlaceOrderPage } from "./PlaceOrderPage";
import { CategoryPage } from "./CategoryPage";

export class POManager {
    page: Page;

    loginPage: LoginPage;
    commonObjects: CommonObjects;
    contactUsPage: ContactUs;
    productsPage: ProductsPage;
    signupPage: SignupPage;
    subscriptionPage: SubscriptionPage;
    testCasesPage: TestCasesPage;
    cartPage: CartPage;
    paymentPage: PaymentPage;
    placeOrderPage: PlaceOrderPage;
    categoryPage:CategoryPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.commonObjects = new CommonObjects(this.page);
        this.contactUsPage = new ContactUs(this.page);
        this.productsPage = new ProductsPage(this.page);
        this.signupPage = new SignupPage(this.page);
        this.subscriptionPage = new SubscriptionPage(this.page);
        this.testCasesPage = new TestCasesPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.paymentPage = new PaymentPage(this.page);
        this.placeOrderPage = new PlaceOrderPage(this.page);
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getCommonObjects(): CommonObjects {
        return this.commonObjects;
    }

    getContactUsPage(): ContactUs {
        return this.contactUsPage;
    }

    getProductsPage(): ProductsPage {
        return this.productsPage;
    }

    getSignupPage(): SignupPage {
        return this.signupPage;
    }

    getSubscriptionPage(): SubscriptionPage {
        return this.subscriptionPage;
    }

    getTestCasesPage(): TestCasesPage {
        return this.testCasesPage;
    }

    getCartPage(): CartPage {
        return this.cartPage;
    }

    getPaymentPage(): PaymentPage {
        return this.paymentPage;
    }

    getPlaceOrderPage(): PlaceOrderPage {
        return this.placeOrderPage;
    }

    getCategoryPage(): CategoryPage {
        return this.categoryPage;
    }
}
