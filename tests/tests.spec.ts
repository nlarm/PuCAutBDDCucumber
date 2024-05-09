import { test, expect } from '@playwright/test';
import { AccountPage } from './AccountPage';
import { MainPage } from './mainPage';
import { WhatIsNewsPage } from './WhatIsNewsPage';

test('conferir botão shop new yoga', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.abrirSite();

  const botaoshop = await page.locator('[class="action more button"]').textContent();
  expect(botaoshop).toEqual('Shop New Yoga');
});

test('Verificar título da página', async ({ page }) => {
  const whatIsNewsPage = new WhatIsNewsPage(page);
  await whatIsNewsPage.whatIsNew();

  const titulo = await page.locator('h1').innerText();
  expect(titulo).toEqual('What\'s New');
});

test('Verificar título da página create account', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.navigateCreatAccount()
  
  const tituloPagina = await page.locator('[class="page-title"]').innerText();
  expect(tituloPagina).toEqual('Create New Customer Account');
});

test('Creating an existing account', async ({page}) => {

    const accountPage = new AccountPage(page);

    await accountPage.navigateCreatAccount()
    await accountPage.fillOutForm(accountPage.userFirstName,accountPage.userLastName,accountPage.userEmail, accountPage.passwordFillout,accountPage.passwordFillout)
    await accountPage.clickSubmit()

    const result = await accountPage.checkErrorMessage(page);
    expect(result).toBeTruthy();
});

test('Creating a new account', async ({page}) => {

    const accountPage = new AccountPage(page);
    const nomeDate = `Galvao_${Date.now()}_`;

    await accountPage.navigateCreatAccount()
    await accountPage.fillOutForm(nomeDate,accountPage.userLastName,nomeDate+accountPage.userEmail,accountPage.passwordFillout, accountPage.passwordFillout)
    await accountPage.clickSubmit()

    const result = await accountPage.checkSuccessMessage(page);
    expect(result).toBeTruthy();
});

test('Check password is the same', async ({page}) => {
  
    const accountPage = new AccountPage(page);
    const nomeDate = `Galvao_${Date.now()}_`;
    const wrongPassword = "MentiraAGloboEhMelhor"

    await accountPage.navigateCreatAccount()
    await accountPage.fillOutForm(nomeDate,accountPage.userLastName, nomeDate+accountPage.userEmail, accountPage.passwordFillout, wrongPassword)
    await accountPage.clickSubmit()

    const result = await accountPage.checkPasswordError(page);
    expect(result).toBeTruthy();
});

test('Weak password', async ({page}) => {

  const accountPage = new AccountPage(page);

  await accountPage.navigateCreatAccount();
  await accountPage.fillOutForm(accountPage.userFirstName, accountPage.userLastName, accountPage.userEmail, accountPage.weakPassword1234, accountPage.weakPassword1234)
  await accountPage.clickSubmit();

  const result = await accountPage.checkWeakPassword(page);
  expect(result).toBeTruthy();
});

test('Missing field First Name', async ({page}) => {

  const accountPage = new AccountPage(page);

  await accountPage.navigateCreatAccount();
  await accountPage.fillOutForm("", accountPage.userLastName, accountPage.userEmail, accountPage.passwordFillout, accountPage.passwordFillout)
  await accountPage.clickSubmit();

  const result = await accountPage.checkMissingFirstName(page);
  expect(result).toBeTruthy();
});

test('Missing field Last Name', async ({page}) => {

  const accountPage = new AccountPage(page);

  await accountPage.navigateCreatAccount();
  await accountPage.fillOutForm(accountPage.userFirstName, "", accountPage.userEmail, accountPage.passwordFillout, accountPage.passwordFillout)
  await accountPage.clickSubmit();

  const result = await accountPage.checkMissingLastName(page);
  expect(result).toBeTruthy();
});

test('Missing field email', async ({page}) => {

  const accountPage = new AccountPage(page);

  await accountPage.navigateCreatAccount();
  await accountPage.fillOutForm(accountPage.userFirstName, accountPage.userLastName, "", accountPage.passwordFillout, accountPage.passwordFillout)
  await accountPage.clickSubmit();

  const result = await accountPage.checkMissingEmail(page);
  expect(result).toBeTruthy();
});

test('Missing field password', async ({page}) => {

  const accountPage = new AccountPage(page);

  await accountPage.navigateCreatAccount();
  await accountPage.fillOutForm(accountPage.userFirstName, accountPage.userLastName, accountPage.userEmail, "", accountPage.passwordFillout)
  await accountPage.clickSubmit();

  const result = await accountPage.checkMissingPassword(page);
  expect(result).toBeTruthy();
});

test('Missing field confirm password', async ({page}) => {

  const accountPage = new AccountPage(page);

  await accountPage.navigateCreatAccount();
  await accountPage.fillOutForm(accountPage.userFirstName, accountPage.userLastName, accountPage.userEmail, accountPage.passwordFillout, "")
  await accountPage.clickSubmit();

  const result = await accountPage.checkMissingConfirmPassword(page);
  expect(result).toBeTruthy();
});

test('Missing all fields', async ({page}) => {

  const accountPage = new AccountPage(page);

  await accountPage.navigateCreatAccount();
  await accountPage.clickSubmit();

  var result = await accountPage.checkMissingFirstName(page);
  expect(result).toBeTruthy();
  result = await accountPage.checkMissingLastName(page);
  expect(result).toBeTruthy();
  result = await accountPage.checkMissingEmail(page);
  expect(result).toBeTruthy();
  result = await accountPage.checkMissingPassword(page);
  expect(result).toBeTruthy();
  result = await accountPage.checkMissingConfirmPassword(page);
  expect(result).toBeTruthy();
});

test('Password is very strong', async ({page}) => {

  const accountPage = new AccountPage(page);

  await accountPage.navigateCreatAccount();
  await accountPage.fillOutForm(accountPage.userFirstName, accountPage.userLastName, accountPage.userEmail, accountPage.passwordFillout, "")
  await accountPage.clickSubmit();

  const result = await accountPage.checkPasswordVeryStrong(page);
  expect(result).toBeTruthy();
});

test('Password is medium', async ({page}) => {

  const accountPage = new AccountPage(page);
  const mediumPassword = 'asd123AS' 

  await accountPage.navigateCreatAccount();
  await accountPage.fillOutForm(accountPage.userFirstName, accountPage.userLastName, accountPage.userEmail, mediumPassword, "")
  await accountPage.clickSubmit();

  const result = await accountPage.checkPasswordMedium(page);
  expect(result).toBeTruthy();
});