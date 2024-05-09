
import { After, AfterAll, Before, BeforeAll, Given, Then, When } from "@cucumber/cucumber"
import { Browser, BrowserContext, chromium, Page, expect } from "playwright/test";
import { AccountPage } from "../AccountPage.ts";
import { UserDTO } from "../dto/user-dto";

let browser: Browser; //navegador
let context: BrowserContext; //aba
let page: Page; // página  web
let user: UserDTO[] = [];

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
});

After(async function () {
    await page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
});

Given('acessar pagína de Create an Account', async function () {
    const accountPage = new AccountPage(page);
    await accountPage.navigateCreatAccount()
});

When('o formulario é submetido com os dados', async function (dataTable) {
    const accountPage = new AccountPage(page);

    const table = dataTable.hashes();
    user = [];
    for (const row of table) {
        const email_aleatorio = !row['Email'] ? "" : Date.now() + row['Email'];
        user.push({
            firstName: row['FirstName'],
            lastName: row['LastName'],
            email: email_aleatorio,
            password: row['Password'],
            confirmPassword: row['ConfirmPassword'],
        });
    }

    await accountPage.fillOutFormDto(user[0]);
    await accountPage.clickSubmit();
});

Then('usuário deverá ser criado com erro', async function () {
    const accountPage = new AccountPage(page);
    const result = accountPage.checkErrorMessage(page);
    expect(result).toBeTruthy();
});