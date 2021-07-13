module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'no-underscore-dangle': ['error', { allow: ['_id', '_doc'] }],
    'no-prototype-builtins': 'warn',
    'no-restricted-properties': 'off',
    'operator-linebreak': 'off',
    'brace-style': ['error', 'stroustrup'],
    'max-len': ['error', { code: 100, tabWidth: 2 }],
    'no-console': 'off',
    'func-names': 'off'
  }
};
