import { expect, test } from '@playwright/test'

test('loads the institutional shell', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'ERGR Zaccar' })).toBeVisible()
})
