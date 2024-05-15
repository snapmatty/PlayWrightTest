import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { chromium, firefox } from "playwright";
import { RegisterPage } from "../page-objects/register.page";
import { faker } from "@faker-js/faker/locale/en";
import { UserAccountPage } from "../page-objects/user-account.page";

test.describe("User Account", () => {
  let registerPage: RegisterPage;
  let userAccountPage: UserAccountPage;

  test.beforeEach(async ({ page }) => {
    const browser: Browser = await firefox.launch({ headless: false });
    const context = await browser.newContext();

    registerPage = new RegisterPage(page);
    await registerPage.gotoRegister();
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
    await registerPage.goToUserAccount();
    userAccountPage = new UserAccountPage(page);
  });

  const testData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    inputEmail: faker.internet.email(),
    cellPhone: faker.phone.number(),
    newName: faker.person.firstName(),
    newLastName: faker.person.lastName(),
    newEmail: faker.internet.email(),
    newCellPhone: faker.phone.number(),
    newPassword: "newpasswordString123",
    passwordConfirm: "newpasswordString123",
  };

  test("should allow to change credentials", async ({ page }) => {
    await userAccountPage.changeCredentials(
      testData.newName,
      testData.newLastName,
      testData.newEmail,
      testData.newCellPhone
    );
    await expect(
      page.getByText("Success: Your account has been successfully updated.")
    ).toBeVisible();
  });

  test("should allow to subscribe to newsletter", async ({ page }) => {
    await userAccountPage.newsletterSubscriptionAccept();
    await expect(
      page.getByText(
        "Success: Your newsletter subscription has been successfully updated!"
      )
    ).toBeVisible();
  });
});