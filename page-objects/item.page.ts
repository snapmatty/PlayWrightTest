import { expect, type Locator, type Page } from "@playwright/test";
//import { checkoutButton } from "../page-objects/landing.page";

exports.ItemPage = class ItemPage {
  page: any;
  searchTitle: string;
  addtoCartButton: any;
  checkoutButton: any;
  goToCartNotificationLink: any;

  constructor(page: {
    locator: (arg0: string) => any;
    getByText: (arg0: string) => any;
  }) {
    this.page = page;
    this.searchTitle = page.locator('//*[@id="content"]/div/div[2]/h1');
    this.addtoCartButton = page.locator("id=button-cart");
    this.checkoutButton = page.locator('//*[@id="top-links"]/ul/li[5]');
    this.goToCartNotificationLink = page.locator(
      '//*[@id="product-product"]/div[1]/a[2]'
    );
  }

  async waitForPageLoad(): Promise<void> {}

  async checkTitle(itemName: string) {
    await expect(this.searchTitle).toContainText(itemName, {
      ignoreCase: true,
    });
  }

  async goToCartLink() {
    await this.goToCartNotificationLink.click();
  }

  async addToCart() {
    await this.addtoCartButton.click();
  }
  async goToCheckout() {
    await this.checkoutButton.click();
  }
};
