module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpe?g|gif|svg|webp|ico|mp4)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^@iconify/react$': '<rootDir>/src/__mocks__/iconify.jsx',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // @smarter.sh/ui-widgets is an ES module, which Babel converts to CommonJS, as it
  // does the site's own code. Its stylesheet import is mapped above.
  transformIgnorePatterns: ['/node_modules/(?!@smarter\\.sh/ui-widgets/)'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx}',
  ],
  // Fix for naming collisions
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/webai/'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/webai/',
  ],
}
