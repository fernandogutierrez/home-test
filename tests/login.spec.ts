import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

let loginPage: LoginPage;
let homePage: HomePage;


test.beforeEach(async ({page}) => {
  await page.goto('/login');
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
});

test('1. Login Success', async () => {
  const username = 'johndoe19';
  const password = 'supersecret';
  await loginPage.setUsername(username);
  await loginPage.setPassword(password);
  await loginPage.clickLogin();

  await expect(homePage.welcomeMessageTxt).toHaveText('Welcome!');
  await expect(homePage.usernameTxt).toHaveText(username);  
});

test('2. Login Failure A', async () => {
  await loginPage.setUsername('wrong user');
  await loginPage.setPassword('wrong password');
  await loginPage.clickLogin();

  await expect(loginPage.errorMessageTxt).toHaveText('Wrong credentials');
});

test('3. Login Failure B', async () => {
  await loginPage.setUsername('');
  await loginPage.setPassword('');
  await loginPage.clickLogin();

  await expect(loginPage.errorMessageTxt).toHaveText('Fields can not be empty');
});

test.afterEach(async ({page}) => {
  await page.close()
});
