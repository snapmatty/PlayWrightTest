import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { chromium, firefox } from "playwright";
import { LoginPage } from "../page-objects/login.page";
import { faker } from "@faker-js/faker/locale/en";

test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    const browser: Browser = await firefox.launch({ headless: false });
    loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
  });

  const testData = {
    invalidEmail: faker.internet.email() + "1231231",
    invalidPassword: "password123",
    validEmail: faker.internet.email({ firstName: "valid" }),
    validPassword: "playwright@123",
  };

  test("should not allow login with invalid credentials", async ({ page }) => {
    await loginPage.enterEmail(testData.invalidEmail);
    await loginPage.enterPassword(testData.invalidPassword);
    await loginPage.clickLogin();

    await expect(
      page.getByText("Warning: No match for E-Mail Address and/or Password.")
    ).toBeVisible();
  });

  test("should lock user after too many login requests", async ({ page }) => {
    let errorMessageFound = false;
    const errorMessage =
      "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.";

    while (!errorMessageFound) {
      await loginPage.enterEmail(testData.invalidEmail);
      await loginPage.enterPassword(testData.invalidPassword);
      await loginPage.clickLogin();

      await page.waitForTimeout(2000); // Wait for 2 seconds for error message to appear

      errorMessageFound = await page.$eval(
        "body",
        (body, errorMessage) => {
          return body.innerText.includes(errorMessage);
        },
        errorMessage
      );
    }
    await expect(page.getByText(errorMessage)).toBeVisible();
  });

  test("should allow login with valid credentials", async ({ page }) => {
    await loginPage.enterEmail(testData.validEmail);
    await loginPage.enterPassword(testData.validPassword);
    await loginPage.clickLogin();

    const title = await page.title();
    console.log("home page title:", title);

    await page.screenshot({ path: "homepage.png" });

    expect(title).toEqual("My Account");
  });
});
