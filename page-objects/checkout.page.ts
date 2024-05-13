import { expect, type Locator, type Page } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/en";

exports.CheckoutPage = class CheckoutPage {
  page: any;
  continueButton: any;
  guestRadioButton: any;
  firstNameInput: any;
  lastNameInput: any;
  emailInput: any;
  telephoneInput: any;
  addressInput: any;
  cityInput: any;
  postcodeInput: any;
  countryInput: any;
  regionInput: any;
  countryDropDown: any;
  regionDropDown: any;
  continuePaymentButton: any;
  collapsePaymentTextInput: any;
  termsConditionsCheckbox: any;
  continueToPaymentButton: any;

  constructor(page: {
    locator: (arg0: string) => any;
    getByText: (arg0: string) => any;
  }) {
    this.page = page;
    this.guestRadioButton = page.locator(
      '//*[@id="collapse-checkout-option"]/div/div/div[1]/div[2]/label/input'
    );
    this.continueButton = page.getByText("Continue");
    this.firstNameInput = page.locator("id=input-payment-firstname");
    this.lastNameInput = page.locator("id=input-payment-lastname");
    this.emailInput = page.locator("id=input-payment-email");
    this.telephoneInput = page.locator("id=input-payment-telephone");
    this.addressInput = page.locator("id=input-payment-address-1");
    this.cityInput = page.locator("id=input-payment-city");
    this.postcodeInput = page.locator("id=input-payment-postcode");
    this.countryDropDown = page.locator("id=input-payment-country");
    this.regionDropDown = page.locator("id=input-payment-zone");
    this.firstNameInput = page.locator("id=input-payment-firstname");
    this.firstNameInput = page.locator("id=input-payment-firstname");
    this.continuePaymentButton = page.locator("id=button-guest");
    this.collapsePaymentTextInput = page.locator(
      '//*[@id="collapse-payment-method"]/div/p[2]/textarea'
    );
    this.termsConditionsCheckbox = page.locator(
      '//*[@id="collapse-payment-method"]/div/div[2]/div/input[1]'
    );
    this.continueToPaymentButton = page.locator("id=button-payment-method");
  }

  async fillBillingInfo() {
    await this.firstNameInput.fill(faker.person.firstName());
    await this.lastNameInput.fill(faker.person.lastName());
    await this.emailInput.fill(faker.internet.email());
    await this.telephoneInput.fill(faker.phone.number());
    await this.addressInput.fill(faker.address.buildingNumber());
    await this.cityInput.fill(faker.address.city());
    await this.postcodeInput.fill(faker.address.zipCode());
    await this.countryDropDown.selectOption({ value: "170" });
    await this.regionDropDown.selectOption({ value: "2636" });
    await this.continuePaymentButton.click();
    await this.collapsePaymentTextInput.fill("test string");
    await this.termsConditionsCheckbox.check();
    await this.continueToPaymentButton.click();
  }

  async guestPurchase() {
    await this.guestRadioButton.check();
    await this.continueButton.click();
  }

  async waitForPageLoad(): Promise<void> {}
};
