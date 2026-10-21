module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpe?g|gif|svg|webp|ico|mp4)$': '<rootDir>/src/__mocks__/fileMock.js',
    '^@iconify/react$': '<rootDir>/src/__mocks__/iconify.jsx',
    '^@/(.*)$': '<rootDir>/src/$1',
    // @smarter.sh/ui-widgets 0.35.4-alpha.2 declares only an ESM ("import") entry
    // point, which Jest's CommonJS resolver doesn't use. Later versions add a
    // "default" one, which makes this mapping unnecessary. Its stylesheet import
    // is mapped above.
    '^@smarter\\.sh/ui-widgets$':
      '<rootDir>/node_modules/@smarter.sh/ui-widgets/dist/ui-widgets.es.js',
  },
  // Babel converts the package's ESM to CommonJS, as it does the site's own code.
  transformIgnorePatterns: ['/node_modules/(?!@smarter\\.sh/ui-widgets/)'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx}'
  ],
  // Fix for naming collisions
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/webai/'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/webai/'
  ]
};
