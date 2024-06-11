import { expect } from '@playwright/test'

import { test } from './lib/fixtures'

test('Onboarding Flow', async ({ page }) => {
  await page.goto('/')
})
