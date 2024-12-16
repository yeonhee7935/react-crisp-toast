module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.(mp3|wav|ogg)$": "jest-transform-stub",
    "^@src/(.*)$": "<rootDir>/$1", // src 경로 매핑 추가
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
};
