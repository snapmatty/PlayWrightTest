import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { chromium, firefox } from "playwright";
import { LandingPage } from "../page-objects/landing.page";
import { SearchResultPage } from "../page-objects/search-results.page";
import { faker } from "@faker-js/faker/locale/en";
import { ItemPage } from "../page-objects/item.page";
import { CheckoutPage } from "../page-objects/checkout.page";

test.describe("Landing", () => {
  let landingPage: LandingPage;
  let searchResultPage: SearchResultPage;
  let itemPage: ItemPage;
  let checkoutPage: CheckoutPage;
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
    chosenItem: itemName[2],
  };

  test("should allow search", async ({ page }) => {
    await landingPage.searchItem(testData.chosenItem);
    searchResultPage = new SearchResultPage(page);
    await searchResultPage.checkSearchTitle(testData.chosenItem);
  });

  test("should allow checkout with featured item in cart as guest", async ({
    page,
  }) => {
    await landingPage.featuredItem(testData.chosenItem);
    itemPage = new ItemPage(page);
    await itemPage.waitForPageLoad();
    await itemPage.checkTitle(testData.chosenItem);
    await itemPage.addToCart();
    await itemPage.goToCheckout();
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.guestPurchase();
    await checkoutPage.fillBillingInfo();
  });
});
