/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: [
      "node_modules/(?!(firebase|@firebase|react-router|@remix-run|react-firebase-hooks)/)"
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^../firebase$': '<rootDir>/src/__mocks__/firebase.js'
    }
  };
  
  export default config;