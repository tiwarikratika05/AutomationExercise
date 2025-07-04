export class CommonObjects{

    constructor(page){
        this.page = page;
    }

    async goToWebsite()
    {
        await this.page.goto('/')
    }
}