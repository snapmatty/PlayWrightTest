import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { chromium, firefox } from "playwright";
import { LandingPage } from "../page-objects/landing.page";
import { faker } from "@faker-js/faker/locale/en";

test.describe("Landing", () => {
  let landingPage: LandingPage;
  let itemName: string[] = ["iphone", "canon", "macbook"];

  test.beforeEach(async ({ page }) => {
    const browser: Browser = await firefox.launch({ headless: false });
    landingPage = new LandingPage(page);
    await landingPage.gotoLanding();
  });

  const testData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    inputEmail: faker.internet.email(),
    cellPhone: faker.phone.number(),
    newPassword: "newpasswordString123",
    passwordConfirm: "newpasswordString123",
    itemName,
  };

  test("should allow search", async ({ page }) => {
    await landingPage.searchItem(testData.itemName[1]);
    await expect(page).toHaveURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=" +
        itemName[1]
    );
  });
});
