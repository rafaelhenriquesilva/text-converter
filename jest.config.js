module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.js'],
  globalSetup: './jest.global-setup.js',
  globalTeardown: './jest.global-teardown.js',
  testMatch: [
    "**/__tests__/**/*.spec.ts",
    "**/__tests__/**/*.test.ts",
    "**/__tests__/**/*.spec.js",
    "**/__tests__/**/*.test.js"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/infra/**',
    '!src/**/index.ts',
    '!src/**/clone.ts',
    '!scripts/**/*.{ts,js}',
     '!src/**/*-validator.{ts,js}'
  ],
  coverageThreshold: {
    global: {
      statements: 85
    }
  }
};
