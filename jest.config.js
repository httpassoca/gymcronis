module.exports = {
  verbose: true,
  rootDir: './tests',
  moduleFileExtensions: [
    'js',
    'json',
    // tell Jest to handle `*.vue` files
    'spec.ts',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.{ts,vue}',
    '!**/*.{d.ts}',
    '!**/node_modules/**',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
};
