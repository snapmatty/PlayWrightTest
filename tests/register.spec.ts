import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { chromium, firefox } from "playwright";
import { RegisterPage } from "../page-objects/register.page";
import { faker } from "@faker-js/faker/locale/en";

test.describe("Register", () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    const browser: Browser = await firefox.launch({ headless: false });
    const context = await browser.newContext();

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
    await registerPage.registerAccount(page);
    await page.waitForURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/success"
    );
    await expect(
      page.getByText("Your Account Has Been Created!")
    ).toBeVisible();
  });

  test("should not allow register with unaccepted policy", async ({ page }) => {
    await registerPage.enterPersonalDetails(
      testData.firstName,
      testData.lastName,
      testData.inputEmail,
      testData.cellPhone,
      testData.newPassword,
      testData.passwordConfirm
    );
    await registerPage.registerAccountNoPolicy();
    await expect(
      page.getByText(" Warning: You must agree to the Privacy Policy!")
    ).toBeVisible();
  });
});
