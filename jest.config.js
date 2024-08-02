module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.ts'],
  testMatch: [
    "**/__tests__/**/*.spec.ts",
    "**/__tests__/**/*.test.ts",
    "**/__tests__/**/*.spec.js",
    "**/__tests__/**/*.test.js"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/.*(?<!\\.spec|\\.test)\\.ts$"
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
    '!src/**/clone.ts'
  ],
  coverageThreshold: {
    global: {
      statements: 85
    }
  }
};
