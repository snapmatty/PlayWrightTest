import {
  expect,
  type Locator,
  type Page,
  BrowserContext,
} from "@playwright/test";

exports.RegisterPage = class RegisterPage {
  page: any;
  firstName: any;
  lastName: any;
  inputEmail: any;
  telePhone: any;
  newPassword: any;
  passwordConfirm: any;
  newsletterRadioButton: any;
  privacyPolicyCheckbox: any;
  continueButton: any;

  constructor(page: {
    locator: (arg0: string) => {
      (): any;
      new (): any;
      nth: { (arg0: number): any; new (): any };
    };
  }) {
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
    firstName: string,
    lastName: string,
    inputEmail: string,
    telePhone: string,
    newPassword: string,
    passwordConfirm: string
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

  async goToUserAccount() {
    await this.continueButton.click();
  }
};
