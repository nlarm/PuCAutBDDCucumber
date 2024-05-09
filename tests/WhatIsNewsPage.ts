import { Locator, Page } from '@playwright/test';

export class WhatIsNewsPage {
    private readonly page: Page;
    private readonly urlPrincipal: string;

    constructor(page: Page) { 
        this.page = page;
        this.urlPrincipal = 'https://magento.softwaretestingboard.com/what-is-new.html';
    }

    async whatIsNew() {
        await this.page.goto(this.urlPrincipal);
    }
}