import { expect, test } from '@playwright/test'

test('loads the premium home shell and supports theme/language switches', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      name: 'La maîtrise du terrain au service du développement rural durable.',
    }),
  ).toBeVisible()

  await page
    .getByRole('group', { name: 'Changer de thème visuel' })
    .getByRole('button', { name: 'Sombre' })
    .click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  await page.getByRole('button', { name: 'Changer de langue' }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
})
