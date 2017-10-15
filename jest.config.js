module.exports = {
  collectCoverage: true,
  coverageDirectory: "./test/coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/test/"
  ],
  coverageReporters: ["text", "html"],
  coverageThreshold: {
    "global": {
      "branches": 0,
      "functions": 0,
      "lines": 0,
      "statements": 0
    }
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
  testMatch: [ '**/test/js/**/*-test.js?(x)' ],
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/build/"
  ],
  transformIgnorePatterns: [
    "/node_modules/core-js/",
    "/node_modules/babel-runtime/",
    "/node_modules/regenerator-runtime/",
    "/node_modules/jest-runtime/"
  ],
  verbose: true
}
