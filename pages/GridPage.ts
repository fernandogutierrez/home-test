import { Locator, Page } from "@playwright/test";


export class GridPage {
  private readonly menuItemTitles: Locator;
  private readonly menuItemPrices: Locator;
  private readonly menuItemImages: Locator;
  private readonly menuItemAddToOrderButtons: Locator;

  constructor(page: Page) {
    const menuItems = page.locator('#menu .item');
    this.menuItemTitles = menuItems.locator('h4');
    this.menuItemPrices = menuItems.locator('#item-price');
    this.menuItemImages = menuItems.locator('img');
    this.menuItemAddToOrderButtons = menuItems.locator('[data-test-id=add-to-order]');
    }

  async getItemTitles(): Promise<string[]> {
    return await this.menuItemTitles.allInnerTexts()
  }

  async getItemPrices() {
    const prices = await this.menuItemPrices.allInnerTexts();
    return prices.map(price => price.replace('$', '').trim());
  }
    
  async getAllItemImages() {
    return await this.menuItemImages.all();
  }

  async getAllItemButtons() {
    return await this.menuItemAddToOrderButtons.all();  
  }
}
