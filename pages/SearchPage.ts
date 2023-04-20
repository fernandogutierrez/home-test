import { Locator, Page } from "@playwright/test";

export class SearchPage {
  private readonly page: Page;
  private readonly searchTxb: Locator;
  private readonly searchBtn: Locator;
  private readonly resultTxt: Locator;
  private readonly searchingLoc: string;

  constructor(page: Page) {
    this.page = page;
    this.searchTxb = page.locator('[name=searchWord]');
    this.searchBtn = page.locator('button .fa-search');
    this.resultTxt = page.locator('#result');
    this.searchingLoc = 'p#result:has-text("Searching...")';
  }

  async makeASearch(text: string): Promise<void> {
    await this.searchTxb.fill(text);
    await this.searchBtn.click();
    await this.page.waitForSelector(this.searchingLoc, { state: 'detached'});
  }

  get resultText() {
    return this.resultTxt;
  }
}
