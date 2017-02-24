module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'no-use-before-define': 'off',
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
  },
};
