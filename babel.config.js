module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
};
