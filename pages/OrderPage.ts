import { Locator, Page } from "@playwright/test";

export class OrderPage {
  private readonly orderLbl: Locator;

  constructor(page: Page) {
    this.orderLbl = page.locator('[data-id=ordernumber]');
  }
  
  async getOrderNumber() {
    const orderText = await this.orderLbl.innerText();
    return Number(orderText.split(':')[1].trim());
  }
}
