import { test, expect } from '@playwright/test';
import _ from 'lodash';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderPage } from '../pages/OrderPage';

let checkoutPage: CheckoutPage;
let orderPage: OrderPage;

test.beforeEach(async ({page}) => {
  await page.goto('/checkout');
  checkoutPage = new CheckoutPage(page);
  orderPage = new OrderPage(page);
})

test('4. Checkout Form Order Success', async ({ page }) => {
  await checkoutPage.setBillingAddress({
    fullname: 'Tester Name',
    email: 'testter@gmail.com', 
    address: 'Torres Avenue N. 145', 
    city: 'Buenos Aires'
  });

  await checkoutPage.setPayment({ 
    nameOnCard: 'Doe', 
    credictNumber: '15555566699', 
    expMonth: 'May', 
    expYear: '2026', 
    cvv: '0000'
  });

  await expect.soft(checkoutPage.sameAdrChbx).toBeChecked({checked: false});

  await checkoutPage.checkSameAddress();
  await checkoutPage.setState('Argentina');
  await checkoutPage.setZip('0000');
  await checkoutPage.clickContinueToCheckout();

  expect(await orderPage.getOrderNumber()).toBeGreaterThan(0);
});

test('5. Checkout Form Alert', async ({ page }) => {
  await checkoutPage.setBillingAddress({
    fullname: 'Tester Name',
    email: 'testter@gmail.com', 
    address: 'Torres Avenue N. 145', 
    city: 'Buenos Aires'
  });

  await checkoutPage.setPayment({ 
    nameOnCard: 'Doe', 
    credictNumber: '15555566699', 
    expMonth: 'May', 
    expYear: '2026', 
    cvv: '0000'
  });
  await checkoutPage.setState('Argentina');
  await checkoutPage.setZip('0000');

  await expect.soft(checkoutPage.sameAdrChbx).toBeChecked({checked: true});

  await checkoutPage.uncheckSameAddress();
  page.on('dialog', async dialog => {
    await dialog.accept();
  });
  await checkoutPage.clickContinueToCheckout();
  await page.waitForEvent('dialog');

  await page.waitForEvent('dialog', { timeout: 5000}).catch(error => {
    expect(error, 'The dialog message is not displayed, it is null').not.toEqual(null);
  })
  
});

test('6. Cart total Test', async () => {
  const prices = await checkoutPage.getAllProductPrices();
  const total = await checkoutPage.getTotalAmount();
  expect(_.sum(prices)).toBe(total);
});

test.afterEach(async ({page}) => {
  await page.close()
});
