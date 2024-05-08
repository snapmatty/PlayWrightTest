import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { chromium, firefox } from "playwright";
import { RegisterPage } from "../page-objects/register.page";
import { faker } from "@faker-js/faker/locale/en";

test.describe("Register", () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    const browser: Browser = await firefox.launch({ headless: false });
    registerPage = new RegisterPage(page);
    await registerPage.gotoRegister();
  });

  const testData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    inputEmail: faker.internet.email(),
    cellPhone: faker.phone.number(),
    newPassword: "newpasswordString123",
    passwordConfirm: "newpasswordString123",
    invalidEmail: "123123123123qwdqwedqqwd",
  };

  test("should allow register with valid credentials", async ({ page }) => {
    await registerPage.enterPersonalDetails(
      testData.firstName,
      testData.lastName,
      testData.inputEmail,
      testData.cellPhone,
      testData.newPassword,
      testData.passwordConfirm
    );
    await registerPage.registerAccount();
  });

  // test('should allow register with valid credentials', async({page})=>{

  //     await loginPage.enterEmail(testData.validEmail)
  //     await loginPage.enterPassword(testData.validPassword)
  //     await loginPage.clickLogin()

  //     const title = await page.title();
  //     console.log("home page title:", title);

  //     await page.screenshot({path: 'homepage.png'});

  //     expect(title).toEqual('My Account');

  // });
});
