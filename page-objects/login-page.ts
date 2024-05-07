import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
readonly page: Page
readonly  emailId:Locator
readonly password:Locator 
readonly loginButton:Locator 
readonly registerButton: Locator


  constructor(page: Page) {
    this.page = page;
    // this.emailId = page.locator('[id="input-email"]');
    // this.password = page.locator('[id="input-password"]');
    // this.loginButton = page.locator("[value='Login']");
    this.registerButton = page.getByText("Continue")
  }

  async waitForPageLoad(): Promise<void> {}

  async goto() {
    await this.page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
  }

  async gotoRegister(){
    await this.registerButton.click()
    await this.page.waitForLoadState()
  }
}