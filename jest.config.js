/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(svg)$": "<rootDir>/__mocks__/styleMock.js",
    },
};

module.exports = config;
