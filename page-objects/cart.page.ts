import { expect, type Locator, type Page } from "@playwright/test";
//import { checkoutButton } from "../page-objects/landing.page";

exports.CartPage = class CartPage {
  page: any;
  addtoCartButton: any;
  checkoutButton: any;
  goToCartButton: any;
  itemQuantityInput: any;
  itemQuantityUpdateButton: any;
  unitPrice: any;
  totalPrice: any;
  updateAlert: any;
  removeItemButton: any;
  emptyCartNotification: any;
  couponButton: any;
  giftCertificateButton: any;
  couponInput: any;
  giftCertificateInput: any;
  couponAccordion: any;
  giftCertificateAccordion: any;

  constructor(page: {
    locator: (arg0: string) => any;
    getByText: (arg0: string) => any;
  }) {
    this.page = page;
    this.itemQuantityInput = page.locator(
      '//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input'
    );
    this.itemQuantityUpdateButton = page.locator(
      '//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/span/button[1]'
    );
    this.unitPrice = page.locator(
      "/html/body/div[2]/div[2]/div/form/div/table/tbody/tr/td[5]"
    );
    this.totalPrice = page.locator(
      "/html/body/div[2]/div[2]/div/form/div/table/tbody/tr/td[6]"
    );
    this.updateAlert = page.locator('//*[@id="checkout-cart"]/div[1]');
    this.removeItemButton = page.locator(
      '//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/span/button[2]'
    );
    this.emptyCartNotification = page.locator('//*[@id="content"]');

    this.couponAccordion = page.locator(
      '//*[@id="accordion"]/div[1]/div[1]/h4/a'
    );
    this.couponInput = page.locator("id=input-coupon");
    this.couponButton = page.locator("id=button-coupon");
    this.giftCertificateAccordion = page.locator(
      '//*[@id="accordion"]/div[2]/div[1]/h4/a'
    );
    this.giftCertificateInput = page.locator("id=input-voucher");
    this.giftCertificateButton = page.locator("id=button-voucher");
  }

  async waitForPageLoad(): Promise<void> {}

  async changeQuantity(quantity: string) {
    //await expect(this.unitPrice).toContainText(this.totalPrice);
    await this.itemQuantityInput.fill(quantity);
    await this.itemQuantityUpdateButton.click();
    await expect(this.updateAlert).toBeVisible();
    //await expect(this.unitPrice).not.toContainText(this.totalPrice); figure out how to compare previous vs current price for better quality of test
  }

  async removeItemFromCart() {
    await this.removeItemButton.click();
    await expect(this.emptyCartNotification).toContainText(
      "Your shopping cart is empty!"
    );
  }

  async addCouponCode(coupon: string) {
    await this.couponAccordion.click();
    await this.couponInput.fill(coupon);
    await this.couponButton.click();
    await expect(this.updateAlert).toContainText(
      "Warning: Coupon is either invalid, expired or reached its usage limit!"
    );
  }
  async addGiftCertification(gift: string) {
    await this.giftCertificateAccordion.click();
    await this.giftCertificateInput.fill(gift);
    await this.giftCertificateButton.click();
    await expect(this.updateAlert).toContainText(
      "Warning: Gift Certificate is either invalid or the balance has been used up!"
    );
  }
};
