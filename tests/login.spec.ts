import {test, expect, Browser, Page, Locator} from '@playwright/test'
import { chromium, firefox } from 'playwright'
import { LoginPage } from '../page-objects/login-page';


test.describe("Login Page", () => {

let loginPage: LoginPage

test.beforeEach(async ({page}) => {
    const browser:Browser =  await firefox.launch({headless:false});
    loginPage = new LoginPage(page);
    await loginPage.goto()

});

  const testData = {
    invalidEmail: "testemail@op.pl",
    invalidPassword: "password123",
    validEmail: "testingvalid@test333.com",
    validPassword: "valid3443",
  };

test('should not allow login with invalid credentials', async({page})=>{

    const emailId:Locator = await page.locator('[id="input-email"]');
    const password:Locator = await page.locator('[id="input-password"]');
    const loginButton:Locator = await page.locator("[value='Login']");

    emailId.fill(testData.invalidEmail);
    password.fill(testData.invalidPassword);
    loginButton.click();

    await expect(page.getByText("Warning: No match for E-Mail Address and/or Password.")).toBeVisible() 
});

test('should allow login with valid credentials', async({page})=>{

    const emailId:Locator = await page.locator('[id="input-email"]');
    const password:Locator = await page.locator('[id="input-password"]');
    const loginButton:Locator = await page.locator("[value='Login']");

    emailId.fill(testData.validEmail);
    password.fill(testData.validPassword);
    loginButton.click();

    await expect(page.getByText("Warning: No match for E-Mail Address and/or Password.")).toBeVisible() 
});

test('should allow registration', async({page})=>{

    await loginPage.gotoRegister()

});

});
