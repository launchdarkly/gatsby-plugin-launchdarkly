module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js'
  },
  testEnvironment: 'jest-environment-jsdom-global',
}
