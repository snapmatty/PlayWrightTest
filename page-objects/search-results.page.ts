import { expect, type Locator, type Page } from "@playwright/test";

exports.SearchResultPage = class SearchResultPage {
  page: any;
  searchTitle: string;

  constructor(page: {
    locator: (arg0: string) => any;
    getByText: (arg0: string) => any;
  }) {
    this.page = page;
    this.searchTitle = page.locator('//*[@id="content"]/h1');
  }

  async waitForPageLoad(): Promise<void> {}

  async checkSearchTitle(itemName: string) {
    await expect(this.searchTitle).toContainText(itemName);
  }
};
