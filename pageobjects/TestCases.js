export class TestCases{

    constructor(page){
        this.page = page;
    }
   async goToTestCasesPage(){
        await this.page.locator("a[href*='/test_cases']").first().click();
    }
   
}