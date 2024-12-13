module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.(mp3|wav|ogg)$": "jest-transform-stub",
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
};
