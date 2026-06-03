import { expect, test } from '@playwright/test'

test('loads the starter application', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Base prête' })).toBeVisible()
})
