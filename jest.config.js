module.exports = {
    testEnvironment: 'node', // Use Node.js environment for testing
    testMatch: ['**/__tests__/**/*.test.js'], // Look for test files in __tests__ folders
    verbose: true, // Show detailed test results
    collectCoverage: true, // Enable code coverage reporting
    coverageDirectory: 'coverage', // Output coverage reports to the "coverage" folder
  };