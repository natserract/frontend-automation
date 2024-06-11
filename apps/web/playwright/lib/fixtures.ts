import type { Page } from '@playwright/test'
import { test as base } from '@playwright/test'

export interface Fixtures {
  page: Page
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PlaywrightTest {}
}

/**
 *  @see https://playwright.dev/docs/test-fixtures
 */
export const test = base.extend<Fixtures>({})
