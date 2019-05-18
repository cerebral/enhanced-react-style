module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{t,j}s?(x)', '!src/**/*.d.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '\\.test\\.tsx?$',
  testPathIgnorePatterns: [
    '/coverage/',
    '/dist/',
    '/es/',
    '/lib/',
    '/node_modules/',
  ],
  // uncomment this if you want a test coverage of 100%
  /* 
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  */
}
