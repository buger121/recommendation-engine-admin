module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    require: true
  },
  parserOptions: {
    extends: 'standard',
    parser: 'babel-eslint'
  },
  plugins: ['vue'],
  rules: {
    'no-console': 'off'
  }
};
