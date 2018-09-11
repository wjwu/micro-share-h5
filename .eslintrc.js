module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: 'babel-eslint',
  extends: ['standard'],
  parserOptions: {
    sourceType: 'module'
  },
  plugins: ['html'],
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    "linebreak-style": [0 ,"error", "windows"],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
