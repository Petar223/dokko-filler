const alias = require('./aliases');

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/test/svgMock.js',
    '\\.css$': '<rootDir>/test/styleMock.js',
    ...Object.fromEntries(
      Object.entries(alias).map(([key, dir]) => [`^${key}/(.*)$`, `${dir}/$1`])
    ),
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],
};
