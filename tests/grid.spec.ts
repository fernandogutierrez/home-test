import { test, expect } from '@playwright/test';
import { GridPage } from '../pages/GridPage';

let gridPage: GridPage;

test.beforeEach(async ({page}) => {
  await page.goto('/grid');
  gridPage = new GridPage(page);
})

test('7. Grid Item Test', async () => {
  const menuItems: string[] = await gridPage.getItemTitles();
  const superPepperoniPosition: number = menuItems.indexOf('Super Pepperoni') + 1;
  expect(superPepperoniPosition).toBe(7);
});

test('8. Grid All Items Test', async () => {
  const menuItemsTitle: string[] = await gridPage.getItemTitles();

  menuItemsTitle.map(title => title.trim()).forEach(title =>{
    expect(title, 'Assert that all items have a non empty title').not.toBe('');
  });

  const menuItemsPrice = await gridPage.getItemPrices();

  menuItemsPrice.forEach(price => {
    expect(price, 'Assert that all items have a non empty price').not.toBe('');
  });

  for(const mItem of await gridPage.getAllItemImages()) {
      const imgSrc = await mItem.getAttribute('src');
      expect(imgSrc).not.toBe('');
  }

  expect(await gridPage.getAllItemButtons(), 'Assert that all the menu items have a non empty button')
     .toHaveLength(menuItemsTitle.length);
});

test.afterEach(async ({page}) => {
  await page.close()
});
