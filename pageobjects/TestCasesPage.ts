import { Page } from "@playwright/test";

export class TestCases{
    page: Page;

    constructor(page:Page){
        this.page = page;
    }
   async goToTestCasesPage(){
        await this.page.locator("a[href*='/test_cases']").first().click();
    }
   
}