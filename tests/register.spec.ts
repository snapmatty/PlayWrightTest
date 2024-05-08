import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { chromium, firefox } from "playwright";
import { RegisterPage } from "../page-objects/register.page";

test.describe("Register", () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    const browser: Browser = await firefox.launch({ headless: false });
    registerPage = new RegisterPage(page);
    await registerPage.gotoRegister();
  });

  const testData = {
    firstName: "TestName",
    lastName: "TestLastName",
    inputEmail: "validemailtest@otest.com",
    cellPhone: "543433357",
    newPassword: "passw0rdtest123",
    passwordConfirm: "passw0rdtest123",
    invalidEmail: "123123123123qwdqwedqqwd",
  };

  test("should not allow register with invalid credentials", async ({
    page,
  }) => {
    await registerPage.enterPersonalDetails(
      testData.firstName,
      testData.lastName,
      testData.inputEmail,
      testData.cellPhone,
      testData.invalidEmail,
      testData.newPassword,
      testData.passwordConfirm
    );
    await registerPage.registerAccount();

    //await expect(page.getByText("Warning: No match for E-Mail Address and/or Password.")).toBeVisible()
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
