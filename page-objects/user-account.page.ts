import { expect, type Locator, type Page } from "@playwright/test";
//import { checkoutButton } from "../page-objects/landing.page";

exports.UserAccountPage = class UserAccountPage {
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
  editAccountNavButton: any;
  myInfoFirstNameInput: any;
  myInfoLastNameInput: any;
  myInfoEmailInput: any;
  myInfoCellPhoneInput: any;
  continueButton: any;
  newsletterSubscriptionNavButton: any;
  newsletterRadioButtonYes: any;
  changePasswordNavButton: any;
  changePassOldPassInput: any;
  changePassNewPassInput: any;

  constructor(page: {
    locator: (arg0: string) => any;
    getByText: (arg0: string) => any;
  }) {
    this.page = page;
    this.editAccountNavButton = page.locator(
      '//*[@id="content"]/ul[1]/li[1]/a'
    );
    this.myInfoFirstNameInput = page.locator('[id="input-firstname"]');
    this.myInfoLastNameInput = page.locator('[id="input-lastname"]');
    this.myInfoEmailInput = page.locator('[id="input-email"]');
    this.myInfoCellPhoneInput = page.locator('[id="input-telephone"]');
    this.continueButton = page.locator(
      '//*[@id="content"]/form/div/div[2]/input'
    );
    this.newsletterSubscriptionNavButton = page.locator(
      '//*[@id="content"]/ul[4]/li/a'
    );
    this.newsletterRadioButtonYes = page.locator(
      '//*[@id="content"]/form/fieldset/div/div/label[1]/input'
    );
    this.changePasswordNavButton = page.locator(
      '//*[@id="content"]/ul[1]/li[2]/a'
    );
    this.changePassOldPassInput = page.locator('[id="input-password"]');
    this.changePassNewPassInput = page.locator('[id="input-confirm"]');
  }

  async waitForPageLoad(): Promise<void> {}

  async changeCredentials(
    newName: string,
    newLastName: string,
    newEmail: string,
    newCellPhone: string
  ) {
    await this.editAccountNavButton.click();
    await this.myInfoCellPhoneInput.fill(newName);
    await this.myInfoLastNameInput.fill(newLastName);
    await this.myInfoEmailInput.fill(newEmail);
    await this.myInfoCellPhoneInput.fill(newCellPhone);
    await this.continueButton.click();
  }

  async newsletterSubscriptionAccept() {
    await this.newsletterSubscriptionNavButton.click();
    await this.newsletterRadioButtonYes.check();
    await this.continueButton.click();
  }

  async changePassword(oldPassword: string, newPassword: string) {
    await this.changePasswordNavButton.click();
    await this.changePassOldPassInput.fill(oldPassword);
    await this.changePassNewPassInput.fill(newPassword);
    await this.continueButton.click();
  }
};
