import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly welcomeMessageTxt: Locator;
  readonly usernameTxt: Locator;

  constructor(page: Page){
    const welcomeMessage = page.locator('[id=welcome-message]');
    this.welcomeMessageTxt = welcomeMessage.locator('h2');
    this.usernameTxt = welcomeMessage.locator('[data-id=username]');
  }
}
