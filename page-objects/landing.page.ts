import { expect, type Locator, type Page } from "@playwright/test";

exports.LandingPage = class LandingPage {
  loginButton: any;
  page: any;
  landingSearch: string;
  slideShow: any;
  cartDropDownButton: any;
  featuredMacBook: any;
  featuredPhone: any;
  continueButton: any;
  landingSearchButton: any;

  constructor(page: {
    locator: (arg0: string) => any;
    loactor: (arg0: string) => any;
  }) {
    this.page = page;
    this.landingSearch = page.locator(
      "xpath=/html/body/header/div/div/div[2]/div/input"
    );
    this.landingSearchButton = page.locator(
      "xpath=/html/body/header/div/div/div[2]/div/span"
    );
    this.slideShow = page.locator('//*[@id="content"]/div[1]');
    this.cartDropDownButton = page.locator('//*[@id="cart"]/button');
    this.featuredMacBook = page.locator('//*[@id="content"]/div[2]/div[1]/div');
    this.featuredPhone = page.locator('//*[@id="content"]/div[2]/div[2]/div');
    this.loginButton = page.locator('//*[@id="top-links"]/ul/li[2]/ul/li[2]/a');
  }

  async waitForPageLoad(): Promise<void> {}

  async gotoLanding() {
    await this.page.goto(
      "https://naveenautomationlabs.com/opencart/index.php?route=common/home"
    );
  }

  async gotoRegister() {
    await this.continueButton.click();
    await this.page.waitForLoadState(1000);
  }

  async loginLanding() {
    await this.loginButton.click();
  }

  async searchItem(itemName: string) {
    await this.landingSearch.fill(itemName);
    await this.landingSearchButton.click();
  }
};
