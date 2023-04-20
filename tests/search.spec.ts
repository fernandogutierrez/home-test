import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

let searchPage: SearchPage;

test.beforeEach(async ({page}) => {
  await page.goto('/search');
  searchPage = new SearchPage(page);
})

test('9. Search Success', async () => {
  await searchPage.makeASearch('automation');
  await expect(searchPage.resultText).toHaveText('Found one result for automation');
});

test('10. Search Empty', async () => {
  await searchPage.makeASearch('');
  await expect(searchPage.resultText).toHaveText('Please provide a search word.');
});

test.afterEach(async ({page}) => {
  await page.close()
});
