import { expect, type Locator, type Page } from "@playwright/test";

exports.RegisterPage = class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[id="input-firstname"]');
    this.lastName = page.locator('[id="input-lastname"]');
    this.inputEmail = page.locator("[id='input-email']");
    this.telePhone = page.locator("[id='input-telephone']");

    this.newPassword = page.locator("[id='input-password']");
    this.passwordConfirm = page.locator("[id='input-confirm']");
    this.newsletterRadioButton = page.getByRole("radio", {
      name: "newsletter",
    });
    this.privacyPolicyCheckbox = page.getByRole("checkbox", { name: "agree" });
    this.continueButton = page.getByRole("submit");
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
    //await this.newsletterRadioButton.click(); //figure out this function <---- locators for radio button + checkbox + continue button!!!
    //await this.privacyPolicyCheckbox.check();
    await this.continueButton.click();
  }

  async waitForPageLoad(): Promise<void> {}

  async gotoRegister() {
    await this.page.goto(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
    );
  }
};
