import { Locator, Page } from '@playwright/test';

export class MainPage {
    private readonly page: Page;
    private readonly urlPrincipal: string;

    constructor(page: Page) { 
        this.page = page;
        this.urlPrincipal = 'https://magento.softwaretestingboard.com/';
    }

    async abrirSite() {
        await this.page.goto(this.urlPrincipal);
    }
}