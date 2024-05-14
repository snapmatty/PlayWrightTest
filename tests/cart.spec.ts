import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { chromium, firefox } from "playwright";
import { LandingPage } from "../page-objects/landing.page";
import { faker } from "@faker-js/faker/locale/en";
import { ItemPage } from "../page-objects/item.page";
import { CartPage } from "../page-objects/cart.page";

test.describe("Cart", () => {
  let landingPage: LandingPage;
  let itemPage: ItemPage;
  let cartPage: CartPage;
  let itemName: string[] = ["iphone", "canon", "macbook"];

  test.beforeEach(async ({ page }) => {
    const browser: Browser = await firefox.launch({ headless: false });
    landingPage = new LandingPage(page);
    await landingPage.gotoLanding();
  });

  const testData = {
    chosenItem: itemName[2],
    itemQuantity: "2",
    invalidCoupon: "invalidCouponTest123",
    invalidGift: "invalidGiftInputTest123",
  };

  test("should allow adding item to cart", async ({ page }) => {
    await landingPage.featuredItem(testData.chosenItem);
    itemPage = new ItemPage(page);
    await itemPage.waitForPageLoad();
    await itemPage.checkTitle(testData.chosenItem);
    await itemPage.addToCart();
    await itemPage.goToCart();
    cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    await cartPage.changeQuantity(testData.itemQuantity);
  });

  test("should allow removing item from cart - 1 item scenario", async ({
    page,
  }) => {
    await landingPage.featuredItem(testData.chosenItem);
    itemPage = new ItemPage(page);
    await itemPage.waitForPageLoad();
    await itemPage.checkTitle(testData.chosenItem);
    await itemPage.addToCart();
    await itemPage.goToCart();
    cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    await cartPage.removeItemFromCart();
  });

  test("should not allow adding coupon and gift without proper input", async ({
    page,
  }) => {
    await landingPage.featuredItem(testData.chosenItem);
    itemPage = new ItemPage(page);
    await itemPage.waitForPageLoad();
    await itemPage.checkTitle(testData.chosenItem);
    await itemPage.addToCart();
    await itemPage.goToCart();
    cartPage = new CartPage(page);
    await cartPage.waitForPageLoad();
    await cartPage.addCouponCode(testData.invalidCoupon);
    await cartPage.addGiftCertification(testData.invalidGift);
  });

  //should allow removing item from cart - multiple items scenario
});
