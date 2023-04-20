import { Locator, Page } from "@playwright/test";


export class CheckoutPage {
  private readonly fullNameTxb: Locator;
  private readonly nameOnCardTxb: Locator;
  private readonly emailTxb: Locator;
  private readonly creditCardNumberTxb: Locator;
  private readonly addressTxb: Locator;
  private readonly expMonthCmb: Locator;
  private readonly cityTxb: Locator;
  private readonly expYearTxb: Locator;
  private readonly cvvTxb: Locator;
  private readonly stateTxb: Locator;
  private readonly zipTxb: Locator;
  readonly sameAdrChbx: Locator;
  private readonly continueToCheckoutBtn: Locator;
  private readonly productPricesTxt: Locator;
  private readonly totalAmountTxt: Locator;

  constructor(page: Page){
    this.fullNameTxb = page.locator('input[id=fname]');
    this.nameOnCardTxb = page.locator('input[id=cname]');
    this.emailTxb = page.locator('input[id=email]');
    this.creditCardNumberTxb = page.locator('input[id=ccnum]');
    this.addressTxb = page.locator('input[id=adr]');
    this.expMonthCmb = page.locator('select[id=expmonth]');
    this.cityTxb = page.locator('input[id=city]');
    this.expYearTxb = page.locator('input[id=expyear]');
    this.cvvTxb = page.locator('input[id=cvv]');
    this.stateTxb = page.locator('input[id=state]');
    this.zipTxb = page.locator('input[id=zip]');
    this.sameAdrChbx = page.locator('[name=sameadr]');
    this.continueToCheckoutBtn = page.locator('button', { hasText: 'Continue to checkout'});
    this.productPricesTxt = page.locator('a+span.price');
    this.totalAmountTxt = page.locator('p', { hasText: 'Total' }).locator('span b');
  }

  async checkSameAddress() {
    await this.sameAdrChbx.check();
  }

  async uncheckSameAddress() {
    await this.sameAdrChbx.uncheck();
  }

  async setBillingAddress({ fullname, email, address, city }) {
    Promise.all([
        await this.fullNameTxb.fill(fullname),
        await this.emailTxb.fill(email),
        await this.addressTxb.fill(address),
        await this.cityTxb.fill(city)
    ]);
  }

  async setPayment({ nameOnCard, credictNumber, expMonth, expYear, cvv }) {
    Promise.all([
        await this.nameOnCardTxb.fill(nameOnCard),
        await this.creditCardNumberTxb.fill(credictNumber),
        await this.expMonthCmb.selectOption({label: expMonth}),
        await this.expYearTxb.fill(expYear),
        await this.cvvTxb.fill(cvv)
    ]);
  }

  async setState(state: string) {
    await this.stateTxb.fill(state);
  }

  async setZip(zip: string) {
    await this.zipTxb.fill(zip);
  }

  async clickContinueToCheckout() {
    await this.continueToCheckoutBtn.click();
  }

  async getAllProductPrices() {
    const prices = await this.productPricesTxt.allInnerTexts();
    return prices.map(val => Number(val.replace('$', '').trim()));
  }

  async getTotalAmount() {
    const total = await this.totalAmountTxt.innerText();
    return Number(total.replace('$', ''));
  }
}
