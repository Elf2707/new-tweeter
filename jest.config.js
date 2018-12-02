module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  testMatch: ['**/*.test.ts?(x)'],
  setupTestFrameworkScriptFile: '<rootDir>/src/__tests__/setup.js',
  testEnvironment: 'jsdom'
}
