// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.js'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  verbose: true,
  testTimeout: 10000,
  setupFilesAfterEnv: [
    './tests/setup.js',
  ],
};
