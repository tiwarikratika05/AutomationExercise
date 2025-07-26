import { Page, Locator} from '@playwright/test';
import { faker } from "@faker-js/faker";

export class PaymentPage {
    page: Page;
    nameOnCard: Locator;
    cardNumber: Locator;
    cvvNumber: Locator;
    expiryMonth: Locator;
    expiryYear: Locator;
    paymentSubmit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameOnCard = page.locator("input[name='name_on_card']");
        this.cardNumber= page.locator("input[name='card_number']");
        this.cvvNumber= page.locator("[name$='cvc']");
        this.expiryMonth= page.locator("[name$='expiry_month']");
        this.expiryYear= page.locator("[name$='expiry_year']");
        this.paymentSubmit= page.locator("#submit");

    }

    async fillCardDetails(firstName: string, lastName: string) {
        const nameOnCard = `${firstName} ${lastName}`;
        const creditCardNumber = faker.finance.creditCardNumber();
        const cvc = faker.finance.creditCardCVV();
        const expiryMonth = faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0');
        const expiryYear = faker.number.int({ min: 2026, max: 2035 }).toString();
      
        await this.nameOnCard.fill(nameOnCard);
        await this.cardNumber.fill(creditCardNumber);
        await this.cvvNumber.fill(cvc);
        await this.expiryMonth.fill(expiryMonth);
        await this.expiryYear.fill(expiryYear);
        await this.paymentSubmit.click();
      }
}
