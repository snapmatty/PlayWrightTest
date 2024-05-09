import {
  expect,
  type Locator,
  type Page,
  BrowserContext,
} from "@playwright/test";

exports.RegisterPage = class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[id="input-firstname"]');
    this.lastName = page.locator('[id="input-lastname"]');
    this.inputEmail = page.locator("[id='input-email']");
    this.telePhone = page.locator("[id='input-telephone']");

    this.newPassword = page.locator("[id='input-password']");
    this.passwordConfirm = page.locator("[id='input-confirm']");
    this.newsletterRadioButton = page.locator('css=input[type="radio"]').nth(1);
    this.privacyPolicyCheckbox = page.locator('css=input[type="checkbox"]');
    this.continueButton = page.locator("text=Continue");
  }

  async enterPersonalDetails(
    firstName,
    lastName,
    inputEmail,
    telePhone,
    newPassword,
    passwordConfirm
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.inputEmail.fill(inputEmail);

    await this.telePhone.fill(telePhone);
    await this.newPassword.fill(newPassword);
    await this.passwordConfirm.fill(passwordConfirm);
  }

  async registerAccount() {
    await this.newsletterRadioButton.check();
    await this.privacyPolicyCheckbox.check();
    await this.continueButton.click();
  }
  async registerAccountNoPolicy() {
    await this.newsletterRadioButton.check();
    await this.privacyPolicyCheckbox.uncheck();
    await this.continueButton.click();
  }

  async waitForPageLoad(): Promise<void> {}

  async gotoRegister() {
    await this.page.goto(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
    );
  }
};
