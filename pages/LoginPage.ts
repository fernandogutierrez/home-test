import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly userTxb: Locator;
  readonly passwordTxb: Locator;
  readonly loginBtn: Locator;
  readonly errorMessageTxt: Locator;

  constructor(page: Page){
    this.userTxb = page.locator('[id=username]');
    this.passwordTxb = page.locator('[id=password]');
    this.loginBtn = page.locator('button[id=signin-button]');
    this.errorMessageTxt = page.locator('[id=message]');
  }

  async setUsername(username: string) {
    await this.userTxb.fill(username);
  }

  async setPassword(password: string) {
    await this.passwordTxb.fill(password);
  }

  async clickLogin() {
    await this.loginBtn.click();
  }    
}
