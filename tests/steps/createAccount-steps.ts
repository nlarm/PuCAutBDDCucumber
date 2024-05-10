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

Given('acessar pagína de Create an Account', { timeout: 10000 }, async function () {
    const accountPage = new AccountPage(page);
    await accountPage.navigateCreatAccount()
});

When('o formulario é submetido com os dados onde o email contera a data e hora atual para ser único', async function (dataTable) {
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

Then('usuário deverá ser criado com sucesso', async function () {
    const accountPage = new AccountPage(page);
    const result = await accountPage.checkSuccessMessage(page);
    expect(result).toBeTruthy();
});

When('o formulario é submetido com os dados', { timeout: 10000 }, async function (dataTable) {
    const accountPage = new AccountPage(page);

    const table = dataTable.hashes();
    user = [];
    for (const row of table) {
        user.push({
            firstName: row['FirstName'],
            lastName: row['LastName'],
            email: row['Email'],
            password: row['Password'],
            confirmPassword: row['ConfirmPassword'],
        });
    }

    await accountPage.fillOutFormDto(user[0]);
    await accountPage.clickSubmit();
});

Then('usuário não deverá ser criado e uma mensagem de erro deve ser exibida na tela', { timeout: 10000 }, async function () {
    const accountPage = new AccountPage(page);
    const result = await accountPage.checkErrorMessage(page);
    expect(result).toBeTruthy();
});

Then('deverá apresentar mensagem de erro para o campo {string}', async function (string) {
    const createNewCustomerAccount = new AccountPage(page);

    switch (string) {
        case "First Name":
            await createNewCustomerAccount.checkMissingFirstName(page);
            break;

        case "Last Name":
            await createNewCustomerAccount.checkMissingLastName(page);
            break;

        case "Email":
            await createNewCustomerAccount.checkMissingEmail(page);
            break;

        case "Password":
            await createNewCustomerAccount.checkMissingPassword(page);
            break;

        case "Confirm Password":
            await createNewCustomerAccount.checkMissingConfirmPassword(page);
            break;

        case "Missing all":
            await createNewCustomerAccount.checkMissingFirstName(page);
            await createNewCustomerAccount.checkMissingLastName(page);
            await createNewCustomerAccount.checkMissingEmail(page);
            await createNewCustomerAccount.checkMissingPassword(page);
            await createNewCustomerAccount.checkMissingConfirmPassword(page);
            break;

        case "Strong Password":
            await createNewCustomerAccount.checkPasswordVeryStrong(page);
            break;

        case "Strong Password":
            await createNewCustomerAccount.checkPasswordMedium(page);
            break;            
    }
});

Then('deverá apresentar mensagem de erro para o campo senha {string}', async function (string) {
    const createNewCustomerAccount = new AccountPage(page);

    switch (string) {
        case "Strong Password":
            await createNewCustomerAccount.checkPasswordVeryStrong(page);
            break;

        case "Strong Password":
            await createNewCustomerAccount.checkPasswordMedium(page);
            break;            
    }
});
