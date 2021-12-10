module.exports = {
  verbose: true,
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',

  moduleFileExtensions: [
    'js',
    'json',
    'vue',
    'ts',
  ],

  // localVue.use(ElementUI) doesnt work without this
  // https://github.com/ElemeFE/element/issues/11811
  moduleNameMapper: {
    '\\.css$': '<rootDir>/tests/__mocks__/styleMock.js',
  },

  transformIgnorePatterns: [
    '/node_modules/',
  ],

  collectCoverageFrom: [
    '**/*.{ts,vue}',
    '!**/*.{d.ts}',
    '!**/node_modules/**',
  ],

};
