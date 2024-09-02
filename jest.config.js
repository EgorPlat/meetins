/** @type {import('jest').Config} */
const config = {
    clearMocks: true,
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(svg)$": "<rootDir>/__mocks__/styleMock.js",
    },
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { configFile: "./configs/babel.config.js" }],
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};

module.exports = config;
