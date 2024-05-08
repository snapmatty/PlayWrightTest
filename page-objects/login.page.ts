import { expect, type Locator, type Page } from "@playwright/test";

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailId = page.locator('[id="input-email"]');
    this.password = page.locator('[id="input-password"]');
    this.loginButton = page.locator("[value='Login']");
    this.continueBUtton = page.getByText("Continue");
  }

  async enterEmail(emailId) {
    await this.emailId.fill(emailId);
  }

  async enterPassword(password) {
    await this.password.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async waitForPageLoad(): Promise<void> {}

  async gotoLogin() {
    await this.page.goto(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/login"
    );
  }

  async gotoRegister() {
    await this.continueButton.click();
    await this.page.waitForLoadState(1000);
  }
};
