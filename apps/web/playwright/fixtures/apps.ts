import { expect, type Page } from '@playwright/test'

export function createAppsFixture(page: Page) {
  return {
    goToApps: async () => {
      await page.goto('/')
    },
  }
}
