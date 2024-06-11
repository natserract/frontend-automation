const nextJest = require('next/jest.js')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config = {
  displayName: 'UI Core',
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.{js,ts,jsx,tsx}'],
  testEnvironment: 'jsdom',
  /** @see https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom */
  // setupFiles: ["./jest.polyfills.js"],
  /* @see https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom */
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  /* Tells jest to ignore duplicated manual mock files, such as index.js */
  modulePathIgnorePatterns: ['.*__mocks__.*'],
  testPathIgnorePatterns: ['node_modules/', 'dist/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  globalSetup: '<rootDir>/test/global-setup.js',
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js', // for imgs/assets
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // for styles
    '^@/(.*)$': '<rootDir>/$1', // for Path aliases
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

module.exports = createJestConfig(config)
