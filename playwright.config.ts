import { defineConfig, devices } from '@playwright/test'
import type { PlaywrightTestConfig } from '@playwright/test'
import * as path from 'path'
import * as os from 'os'

require('dotenv').config()

const outputDir = path.join(__dirname, 'test-results')

// So, if not in CI, keep the timers high, if the test is stuck somewhere and there is unnecessary wait developer can see in browser that it's stuck
const DEFAULT_NAVIGATION_TIMEOUT = process.env.CI ? 30000 : 120000
const DEFAULT_EXPECT_TIMEOUT = process.env.CI ? 30000 : 120000

// Test Timeout can hit due to slow expect, slow navigation.
// So, it should me much higher than sum of expect and navigation timeouts as there can be many async expects and navigations in a single test
const DEFAULT_TEST_TIMEOUT = process.env.CI ? 60000 : 240000

const headless = !!process.env.CI || !!process.env.PLAYWRIGHT_HEADLESS

const webServer: PlaywrightTestConfig['webServer'] = [
  {
    command:
      'NEXT_PUBLIC_IS_E2E=1 pnpm turbo run start --filter=web -- -p 3000',
    port: 3000,
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
]

const DEFAULT_CHROMIUM = {
  ...devices['Desktop Chrome'],
  timezoneId: 'Europe/London',
  storageState: {
    cookies: [
      {
        url: 'http://localhost:3000',
        name: 'site.com',
        expires: -1,
        value: '1',
      },
    ],
  },
  locale: 'en-US',
  /** If navigation takes more than this, then something's wrong, let's fail fast. */
  navigationTimeout: DEFAULT_NAVIGATION_TIMEOUT,
}

console.log('Check env', process.env.UPLOAD_TO_ARGOS, process.env.CI)

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.PWDEBUG ? 1 : os.cpus().length,
  timeout: DEFAULT_TEST_TIMEOUT,
  maxFailures: headless ? 10 : undefined,
  fullyParallel: true,
  reporter: [
    process.env.CI ? ['dot'] : ['list'],
    [
      '@argos-ci/playwright/reporter',
      {
        uploadToArgos: !!process.env.UPLOAD_TO_ARGOS || !!process.env.CI,
      },
    ],
    [
      'html',
      {
        outputFolder: './test-results/reports/playwright-html-report',
        open: 'never',
      },
    ],
  ],
  outputDir: path.join(outputDir, 'results'),
  webServer,
  use: {
    baseURL: process.env.NEXT_PUBLIC_WEBAPP_URL || 'http://localhost:3000',
    locale: 'en-US',
    trace: 'retain-on-failure',
    headless,
    // chromium-specific permissions - Chromium seems to be the only browser type that requires perms
    contextOptions: {
      permissions: ['clipboard-read', 'clipboard-write'],
    },
  },
  projects: [
    {
      name: '@apps/web',
      testDir: './apps/web/playwright',
      testMatch: /^.*\.e2e\.(t|j)sx?$/,
      expect: {
        timeout: DEFAULT_EXPECT_TIMEOUT,
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TS definitions for USE are wrong.
      use: DEFAULT_CHROMIUM,
    },
  ],
}

export default defineConfig(config)
